package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/VishalTanwani/gochat/apiserver/internal/config"
	"github.com/VishalTanwani/gochat/apiserver/internal/driver"
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
	"github.com/VishalTanwani/gochat/apiserver/internal/repository"
	"github.com/VishalTanwani/gochat/apiserver/internal/repository/dbrepo"
	"github.com/dgrijalva/jwt-go"
	"math/rand"
	"net/http"
	"strings"
	"time"
)

//Repository is repository type
type Repository struct {
	App *config.AppConfig
	DB  repository.DatabaseRepo
}

//Repo used by the handlers
var Repo *Repository

var key = []byte("gochatjwttoken")

//NewRepo creates new Repository
func NewRepo(a *config.AppConfig, db *driver.DB) {
	Repo = &Repository{
		App: a,
		DB:  dbrepo.NewMongoRepo(db.Mongo, a),
	}
}

//RegisterUser will register the user in our data base
func (m *Repository) RegisterUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	user.CreatedAt = time.Now()
	user.UpdatedAt = time.Now()
	rand.Seed(time.Now().UnixNano())
	user.ProfileImage = fmt.Sprintf("https://avatars.dicebear.com/api/avataaars/%v.svg", rand.Intn(1000))
	user.Name = strings.Split(user.Email, "@")[0]
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage":` + err.Error() + `}`))
		return
	}
	userID, err := m.DB.RegisterUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage":` + err.Error() + `}`))
		return
	}
	u, err := m.DB.GetUserByID(userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage":` + err.Error() + `}`))
		return
	}
	u.Token, err = generateJWTToken(u)
	_, _ = verifyToken(u.Token)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage":` + err.Error() + `}`))
		return
	}
	json.NewEncoder(w).Encode(u)
}

func generateJWTToken(user models.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claim := token.Claims.(jwt.MapClaims)
	claim["name"] = user.Name
	claim["email"] = user.Email
	claim["exp"] = time.Now().Add(time.Hour * 24 * 30).Unix()
	tokenString, err := token.SignedString(key)
	return tokenString, err
}

func verifyToken(tokenString string) (bool, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("there was an error")
		}
		return key, nil
	})

	if err != nil {
		panic(err)
	}

	fmt.Println(token.Claims)

	if token.Valid {
		return true, nil
	}
	return false, errors.New("User not Found")
}
