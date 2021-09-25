package main

import (
	"fmt"
	"net/http"
)

const port = ":4000"

func main(){
	fmt.Println("api server")
	fmt.Println("server is running at", port)
	server := &http.Server{
		Addr:    port,
		Handler: routes(),
	}

	fmt.Println("server is running in 5000 port")
	err := server.ListenAndServe()
	if err != nil {
		fmt.Println("error at running server", err)
	}
}

func run(){

}