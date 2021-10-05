package handler

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/VishalTanwani/gochat/apiserver/internal/config"
	"github.com/VishalTanwani/gochat/apiserver/internal/driver"
	"github.com/VishalTanwani/gochat/apiserver/internal/helpers"
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
	if err != nil {
		m.App.ErrorLog.Println("error at decoding body")
		helpers.ServerError(w, err)
		return
	}
	u, err := m.DB.GetUserByEmail(user.Email)
	if err != nil {
		user.CreatedAt = time.Now().Unix()
		user.UpdatedAt = time.Now().Unix()
		user.Status = "online"
		user.LastLogin = append(user.LastLogin, time.Now().Unix())
		rand.Seed(time.Now().UnixNano())
		user.ProfileImage = fmt.Sprintf("https://avatars.dicebear.com/api/avataaars/%v.svg", rand.Intn(1000))
		user.Name = strings.Split(user.Email, "@")[0]
		userID, err := m.DB.RegisterUser(user)
		if err != nil {
			m.App.ErrorLog.Println("error at registering user")
			helpers.ServerError(w, err)
			return
		}
		u, err := m.DB.GetUserByID(userID)
		if err != nil {
			m.App.ErrorLog.Println("error at geting user")
			helpers.ServerError(w, err)
			return
		}
		u.Token, err = generateJWTToken(u)
		if err != nil {
			m.App.ErrorLog.Println("error at generating token")
			helpers.ServerError(w, err)
			return
		}
		json.NewEncoder(w).Encode(u)
	} else {
		u.LastLogin = append(u.LastLogin, time.Now().Unix())
		u.UpdatedAt = time.Now().Unix()
		_, err := m.DB.UpdateUser(u)
		if err != nil {
			m.App.ErrorLog.Println("error at registering user")
			helpers.ServerError(w, err)
			return
		}
		u, err := m.DB.GetUserByID(primtiveObjToString(u.ID))
		if err != nil {
			m.App.ErrorLog.Println("error at geting user")
			helpers.ServerError(w, err)
			return
		}
		u.Token, err = generateJWTToken(u)
		if err != nil {
			m.App.ErrorLog.Println("error at generating token")
			helpers.ServerError(w, err)
			return
		}
		json.NewEncoder(w).Encode(u)
	}
}

//CreateRoom will creat a room in our data base
func (m *Repository) CreateRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	var temp models.RoomWithToken
	err := json.NewDecoder(r.Body).Decode(&temp)
	if err != nil {
		m.App.ErrorLog.Println("error at decoding body")
		helpers.ServerError(w, err)
		return
	}
	err = m.DB.CheckRoomAvaiability(temp.Name)
	if err != nil {
		mapData, err := tokenDecode(temp.Token)
		if err != nil {
			m.App.ErrorLog.Println("error at decoding token")
			helpers.ServerError(w, err)
			return
		}
		var room models.Room
		room.Name = temp.Name
		room.CreatedAt = time.Now().Unix()
		room.UpdatedAt = time.Now().Unix()
		room.Description = "Description ..."
		room.CreatedBy = fmt.Sprint(mapData["email"])
		room.Users = append(room.Users, fmt.Sprint(mapData["email"]))

		roomID, err := m.DB.CreateRoom(room)
		if err != nil {
			m.App.ErrorLog.Println("error at creating room")
			helpers.ServerError(w, err)
			return
		}

		room, err = m.DB.GetRoomByID(roomID)
		if err != nil {
			m.App.ErrorLog.Println("error at getting room")
			helpers.ServerError(w, err)
			return
		}
		json.NewEncoder(w).Encode(room)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage": "room is already created" }`))
		return
	}
}

//JoinRoom will join a user to room
func (m *Repository) JoinRoom(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("content-type", "application/json")
	var temp models.RoomWithToken
	err := json.NewDecoder(r.Body).Decode(&temp)
	if err != nil {
		m.App.ErrorLog.Println("error at decoding body")
		helpers.ServerError(w, err)
		return
	}
	room, err := m.DB.GetRoomByName(temp.Name)
	if err == nil {
		mapData, err := tokenDecode(temp.Token)
		if err != nil {
			m.App.ErrorLog.Println("error at decoding token")
			helpers.ServerError(w, err)
			return
		}
		room.UpdatedAt = time.Now().Unix()
		room.Users = append(room.Users, fmt.Sprint(mapData["email"]))

		_, err = m.DB.UpdateRoom(room)
		if err != nil {
			m.App.ErrorLog.Println("error at updateing room")
			helpers.ServerError(w, err)
			return
		}

		room, err = m.DB.GetRoomByID(primtiveObjToString(room.ID))
		if err != nil {
			m.App.ErrorLog.Println("error at getting room")
			helpers.ServerError(w, err)
			return
		}
		json.NewEncoder(w).Encode(room)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage": "cannot find room" }`))
		return
	}

}

func generateJWTToken(user models.User) (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	claim := token.Claims.(jwt.MapClaims)
	claim["_id"] = user.ID
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
		return false, err
	}

	if token.Valid {
		return true, nil
	}
	return false, errors.New("User not Found")
}

func tokenDecode(tokenString string) (jwt.MapClaims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, errors.New("there was an error")
		}
		return key, nil
	})

	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return claims, nil
	}

	return nil, err
}

func primtiveObjToString(id interface{}) string {
	ID := fmt.Sprintf("%s", id)
	return strings.Split(ID, "\"")[1]
}
