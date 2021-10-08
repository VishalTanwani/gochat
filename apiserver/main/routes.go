package main

import (
	"github.com/VishalTanwani/gochat/apiserver/internal/handler"
	"github.com/go-chi/chi/v5"
	"net/http"
)

func routes() http.Handler {
	mux := chi.NewRouter()
	mux.Post("/user/register", handler.Repo.RegisterUser)
	mux.Post("/user/profile", handler.Repo.GetUserProfile)
	mux.Post("/user/rooms", handler.Repo.UserRooms)
	mux.Post("/user/update", handler.Repo.UpdateUser)
	mux.Post("/room/create", handler.Repo.CreateRoom)
	mux.Post("/room/join", handler.Repo.JoinRoom)
	mux.Post("/room/update", handler.Repo.UpdateRoom)
	mux.Post("/room/leave", handler.Repo.LeaveRoom)
	return mux

}
