package main

import (
	"context"
	"fmt"
	"github.com/VishalTanwani/gochat/apiserver/internal/config"
	"github.com/VishalTanwani/gochat/apiserver/internal/driver"
	"github.com/VishalTanwani/gochat/apiserver/internal/handler"
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
	"log"
	"net/http"
	"os"
)

const port = ":4000"

var app config.AppConfig

func main() {
	fmt.Println("api server")
	fmt.Println("server is running at", port)
	db, err := run()
	if err != nil {
		log.Println("error at run in main", err)
		return
	}

	defer func() {
		if err := db.Mongo.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	defer close(app.MailChan)

	go listenForMail()

	server := &http.Server{
		Addr:    port,
		Handler: routes(),
	}

	err = server.ListenAndServe()
	if err != nil {
		fmt.Println("error at running server", err)
	}
}

func run() (*driver.DB, error) {

	mailChan := make(chan models.MailData)
	app.MailChan = mailChan

	infoLog := log.New(os.Stdout, "INFO\t", log.Ldate|log.Ltime)
	app.InfoLog = infoLog

	errorLog := log.New(os.Stdout, "ERROR\t", log.Ldate|log.Ltime|log.Lshortfile)
	app.ErrorLog = errorLog

	//connect to database
	fmt.Println("Connecting to database...")
	name := "vishal"
	pass := "0109"
	connectionString := fmt.Sprintf("mongodb+srv://%s:%s@gochat.gcc8h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", name, pass)
	db, err := driver.ConnectMongo(connectionString)
	if err != nil {
		log.Fatal("cannot connect to database ", err)
		return nil, err
	}
	handler.NewRepo(&app, db)
	return db, nil

}
