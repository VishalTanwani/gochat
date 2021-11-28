package dbrepo

import (
	"context"
	"fmt"
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"strings"
	"time"
)

//RegisterUser will register a user
func (m *mongoDBRepo) RegisterUser(user models.User) (string, error) {
	collection := m.DB.Database("gochat").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.InsertOne(ctx, user)
	if err != nil {
		return "", err
	}
	return primtiveObjToString(result.InsertedID), nil
}

//GetUserByID give the user by id
func (m *mongoDBRepo) GetUserByID(id string) (models.User, error) {
	var u models.User
	collection := m.DB.Database("gochat").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	userID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return u, err
	}
	err = collection.FindOne(ctx, models.User{ID: userID}).Decode(&u)
	if err != nil {
		return u, err
	}
	return u, nil
}

//GetUserByEmail give the user by email
func (m *mongoDBRepo) GetUserByEmail(email string) (models.User, error) {
	var u models.User
	collection := m.DB.Database("gochat").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, models.User{Email: email}).Decode(&u)
	if err != nil {
		return u, err
	}
	return u, nil
}

//GetUserRooms give the user rooms by email
func (m *mongoDBRepo) GetUserRooms(email string) ([]models.Room, error) {
	var rooms []models.Room
	collection := m.DB.Database("gochat").Collection("rooms")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	// var emails []string
	// emails = append(emails,email)
	cursor, err := collection.Find(ctx, bson.D{{"users", email}})
	if err != nil {
		return rooms, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var room models.Room
		cursor.Decode(&room)
		rooms = append(rooms, room)
	}
	if err := cursor.Err(); err != nil {
		return rooms, err
	}
	return rooms, nil
}

//CheckUserAvaiability give the user by id
func (m *mongoDBRepo) CheckUserAvaiability(email string) error {
	var u models.User
	collection := m.DB.Database("gochat").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, models.User{Email: email}).Decode(&u)
	return err
}

//UpdateUser will update user
func (m *mongoDBRepo) UpdateUser(u models.User) (string, error) {
	collection := m.DB.Database("gochat").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.ReplaceOne(ctx, models.User{ID: u.ID}, u)
	if err != nil {
		return "", err
	}

	if result.MatchedCount != 0 {
		return "", nil
	}
	if result.UpsertedCount != 0 {
		return primtiveObjToString(result.UpsertedID), nil
	}

	return "", nil
}

//CreateRoom will create a room in db
func (m *mongoDBRepo) CreateRoom(room models.Room) (string, error) {
	collection := m.DB.Database("gochat").Collection("rooms")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.InsertOne(ctx, room)
	if err != nil {
		return "", err
	}
	return primtiveObjToString(result.InsertedID), nil
}

//GetRoomByID give the user by id
func (m *mongoDBRepo) GetRoomByID(id string) (models.Room, error) {
	var room models.Room
	collection := m.DB.Database("gochat").Collection("rooms")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	roomID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return room, err
	}
	err = collection.FindOne(ctx, models.Room{ID: roomID}).Decode(&room)
	if err != nil {
		return room, err
	}
	return room, nil
}

//GetRoomByName give the user by name
func (m *mongoDBRepo) GetRoomByName(name string) (models.Room, error) {
	var room models.Room
	collection := m.DB.Database("gochat").Collection("rooms")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, models.Room{Name: name}).Decode(&room)
	if err != nil {
		return room, err
	}
	return room, nil
}

//CheckRoomAvaiability give the user by id
func (m *mongoDBRepo) CheckRoomAvaiability(name string) error {
	var room models.Room
	collection := m.DB.Database("gochat").Collection("rooms")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	err := collection.FindOne(ctx, models.Room{Name: name}).Decode(&room)
	return err
}

//UpdateRoom will update room
func (m *mongoDBRepo) UpdateRoom(room models.Room) (string, error) {
	collection := m.DB.Database("gochat").Collection("rooms")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.ReplaceOne(ctx, models.Room{ID: room.ID}, room)
	if err != nil {
		return "", err
	}

	if result.MatchedCount != 0 {
		return "", nil
	}
	if result.UpsertedCount != 0 {
		return primtiveObjToString(result.UpsertedID), nil
	}
	return "", nil
}

func (m *mongoDBRepo) SendMessage(message models.MessageWithToken) (string, error) {
	collection := m.DB.Database("gochat").Collection("messages")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	_, err := collection.InsertOne(ctx, message)
	if err != nil {
		return "", err
	}
	return "Message sent", nil
}

func (m *mongoDBRepo) GetMessagesByRoom(room string) ([]models.Message, error) {
	collection := m.DB.Database("gochat").Collection("messages")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	var messages []models.Message
	cursor,err := collection.Find(ctx, bson.D{{"room", room}})
	if err != nil {
		return messages, err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var message models.Message
		cursor.Decode(&message)
		messages = append(messages, message)
	}
	if err := cursor.Err(); err != nil {
		return messages, err
	}
	return messages, nil
	
}

func primtiveObjToString(id interface{}) string {
	ID := fmt.Sprintf("%s", id)
	return strings.Split(ID, "\"")[1]
}
