package repository

import (
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
)

//DatabaseRepo interface will hold all db functions
type DatabaseRepo interface {
	RegisterUser(user models.User) (string, error)
	GetUserByID(id string) (models.User, error)
	GetUserByEmail(email string) (models.User, error)
	CheckUserAvaiability(email string) error
	UpdateUser(u models.User) (string, error)
}
