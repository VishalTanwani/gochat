package dbrepo

import (
	"context"
	"fmt"
	"strings"
	"time"
	// "go.mongodb.org/mongo-driver/bson"
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	ID := fmt.Sprintf("%s", result.InsertedID)
	return strings.Split(ID, "\"")[1], nil
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
		ID := fmt.Sprintf("%s", result.UpsertedID)
		return strings.Split(ID, "\"")[1], nil
	}

	return "", nil
}
