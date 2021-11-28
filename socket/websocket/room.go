package websocket

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"fmt"
	"net/http"
)

//Room struct
type Room struct {
	Name       string
	Register   chan *Client
	UnRegister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
}

//NewRoom is for creatng new pool
func NewRoom(name string) *Room {
	return &Room{
		Name:       name,
		Register:   make(chan *Client),
		UnRegister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan Message),
	}
}

func (room *Room) writeMessageForRoom(msg Message) {
	for c := range room.Clients {
		c.Write(msg)
	}
}

//StartRoom is for sending different message to all client which are in room
func (room *Room) StartRoom() {
	for {
		select {
		case client := <-room.Register:
			room.Clients[client] = true
		case client := <-room.UnRegister:
			if ok := room.Clients[client]; ok {
				delete(room.Clients, client)
			}
		case msg := <-room.Broadcast:
			_, err := SendDataToDB(msg)
			if err != nil {
				fmt.Println("at startroom ",err)
			}
			room.writeMessageForRoom(msg)
		}
	}
}

//SendDataToDB will send data to mongo db
func SendDataToDB(msg Message) (string, error) {
	jsonReq, err := json.Marshal(msg)
	if err != nil {
		return "", err
	}
	resp, err := http.Post("http://localhost:4000/message/send", "application/json; charset=utf-8", bytes.NewBuffer(jsonReq))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()
	bodyBytes, _ := ioutil.ReadAll(resp.Body)
	// Convert response body to string
	bodyString := string(bodyBytes)
	return bodyString, nil
}
