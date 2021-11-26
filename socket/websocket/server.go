package websocket

// Server is Struct
type Server struct {
	Register   chan *Client
	UnRegister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan Message
	Rooms      map[*Room]bool
}

//NewServer is for creatng new server object
func NewServer() *Server {
	return &Server{
		Register:   make(chan *Client),
		UnRegister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Rooms:      make(map[*Room]bool),
		Broadcast:  make(chan Message),
	}
}

func (server *Server) writeMessage(msg Message) {
	for c := range server.Clients {
		c.Write(msg)
	}
}

//Start is for sending different message to all client
func (server *Server) Start() {
	for {
		select {
		case client := <-server.Register:
			server.Clients[client] = true
		case client := <-server.UnRegister:
			if ok := server.Clients[client]; ok {
				delete(server.Clients, client)
			}
		case msg := <-server.Broadcast:
			server.writeMessage(msg)
		}
	}
}

//FindRoom will find room
func (server *Server) FindRoom(name string) *Room {
	var room *Room
	for rm := range server.Rooms {
		if rm.Name == name {
			room = rm
		}
	}
	return room
}

//CreateRoom will create room
func (server *Server) CreateRoom(name string) *Room {
	room := NewRoom(name)
	server.Rooms[room] = true
	go room.StartRoom()
	return room
}
