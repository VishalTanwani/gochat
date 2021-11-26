package websocket

//Message struct
type Message struct {
	Body     string `json:"body,omitempty"`
	UserID   string `json:"user_id,omitempty"`
	UserName string `json:"user_name,omitempty"`
	Type     string `json:"type,omitempty"`
	Room     string `json:"room,omitempty"`
	Token    string `json:"token,omitempty"`
}
