package repository

import (
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
)

//DatabaseRepo interface will hold all db functions
type DatabaseRepo interface {
	GetPeople() ([]models.Person, error)
}