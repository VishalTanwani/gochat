package websocket

import (
	"fmt"
	"github.com/gorilla/websocket"
)

//Client struct
type Client struct {
	ID     string
	Name string
	Conn   *websocket.Conn
	Server *Server
	Rooms  map[*Room]bool
}

//NewClient will return new client object
func NewClient(UUID string, conn *websocket.Conn, server *Server) *Client {
	return &Client{
		ID:     UUID,
		Conn:   conn,
		Server: server,
		Rooms:  make(map[*Room]bool),
	}
}

//Read for reading client messages
func (c *Client) Read() {
	defer func() {
		c.Server.UnRegister <- c
		c.Conn.Close()
	}()
	for {
		var msg Message
		err := c.Conn.ReadJSON(&msg)
		if err != nil {
			fmt.Println("at client.go Read", err)
			return
		}

		switch msg.Type {
		case "message":
			c.sendMessage(msg)
		case "joinRoom":
			c.joinRoom(msg)
		case "leaveRoom":
			c.leaveRoom(msg)
		}
	}
}

func (c *Client) sendMessage(msg Message) {
	fmt.Println("message client switch 1", msg)
	if room := c.Server.FindRoom(msg.Room); room != nil {
		room.Broadcast <- msg
	}
}

func (c *Client) joinRoom(msg Message) {
	fmt.Println("message client switch 2", msg)
	room := c.Server.FindRoom(msg.Body)
	fmt.Println("at client join room 1", room)
	if room == nil {
		room = c.Server.CreateRoom(msg.Body)
	}
	fmt.Println("at client join room 2", room)
	c.Rooms[room] = true
	c.ID = msg.UUID
	c.Name = msg.Name
	room.Register <- c
}

func (c *Client) leaveRoom(msg Message) {
	fmt.Println("message client switch 3", msg)
	room := c.Server.FindRoom(msg.Body)
	room.UnRegister <- c
	delete(c.Rooms, room)
}

func (c *Client) Write(msg Message) {
	c.Conn.WriteJSON(msg)
}
