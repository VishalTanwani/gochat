package websocket

import (
	"fmt"
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
		fmt.Println(c)
		c.Write(msg)
	}
}

//StartRoom is for sending different message to all client which are in room
func (room *Room) StartRoom() {
	for {
		select {
		case client := <-room.Register:
			room.Clients[client] = true
			fmt.Println("size of room is ", len(room.Clients))
			room.writeMessageForRoom(Message{Body: "New user joined ...", UUID: client.ID, Type: "1"})
		case client := <-room.UnRegister:
			if ok := room.Clients[client]; ok {
				delete(room.Clients, client)
				fmt.Println("size of room is ", len(room.Clients))
				room.writeMessageForRoom(Message{Body: "user disconnected ...", UUID: client.ID, Type: "0"})
			}
		case msg := <-room.Broadcast:
			fmt.Println("sending message to all ")
			room.writeMessageForRoom(msg)
		}
	}
}
