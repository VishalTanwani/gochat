package dbrepo

import (
	"go.mongodb.org/mongo-driver/mongo"
	"github.com/VishalTanwani/gochat/apiserver/internal/config"
	"github.com/VishalTanwani/gochat/apiserver/internal/repository"
)

type mongoDBRepo struct {
	App *config.AppConfig
	DB  *mongo.Client
}

//NewMongoRepo will return postresdb
func NewMongoRepo(conn *mongo.Client, a *config.AppConfig) repository.DatabaseRepo {
	return &mongoDBRepo{
		App: a,
		DB:  conn,
	}
}