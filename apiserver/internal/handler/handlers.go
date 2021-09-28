package handler

import (
	"strings"
	"time"
	"fmt"
	"net/http"
	"encoding/json"
	"github.com/VishalTanwani/gochat/apiserver/internal/config"
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
	"github.com/VishalTanwani/gochat/apiserver/internal/driver"
	"github.com/VishalTanwani/gochat/apiserver/internal/repository"
	"github.com/VishalTanwani/gochat/apiserver/internal/repository/dbrepo"
)

//Repository is repository type
type Repository struct {
	App *config.AppConfig
	DB  repository.DatabaseRepo
}

//Repo used by the handlers
var Repo *Repository

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
	user.Name = strings.Split(user.Email,"@")[0]
	fmt.Println(user)
	if err!=nil{
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage":` + err.Error() + `}`))
		return
	}
	userID,err := m.DB.RegisterUser(user)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte(`{"meesage":` + err.Error() + `}`))
		return
	}
	json.NewEncoder(w).Encode(userID)
}
