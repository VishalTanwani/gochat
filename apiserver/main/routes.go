package main

import (
	"github.com/VishalTanwani/gochat/apiserver/internal/handler"
	"github.com/go-chi/chi/v5"
	"net/http"
)

func routes() http.Handler {
	mux := chi.NewRouter()
	mux.Post("/register", handler.Repo.RegisterUser)
	return mux

}
