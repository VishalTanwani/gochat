package main

import (
	"net/http"
	"github.com/go-chi/chi/v5"
	"github.com/VishalTanwani/gochat/apiserver/internal/handler"
)


func routes() http.Handler {
	mux := chi.NewRouter()
	mux.Get("/people",handler.Repo.GetAllPeople)
	return mux

}