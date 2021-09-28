package dbrepo

import (
	"fmt"
	"time"
	"context"
	// "go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
)

//RegisterUser will register a user
func (m *mongoDBRepo) RegisterUser(user models.User) (interface{}, error) {
	collection := m.DB.Database("gochat").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	result, err := collection.InsertOne(ctx, user)
	if err!=nil{
		return result,err
	}
	return result,nil
}

//GetUserByID give the user by id
func (m *mongoDBRepo) GetUserByID(id string) (models.User,error){
	var u models.User
	collection := m.DB.Database("gochat").Collection("users")
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	userID ,err := primitive.ObjectIDFromHex(id)
	if err!=nil{
		return u,err
	}
	fmt.Println(userID)
	err = collection.FindOne(ctx, models.User{ID:userID}).Decode(&u)
	if err!=nil{
		return u,err
	}
	return u,nil
}