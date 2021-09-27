package dbrepo

import (
	"fmt"
	"time"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"github.com/VishalTanwani/gochat/apiserver/internal/models"
)

func (m *mongoDBRepo) GetPeople() ([]models.Person, error) {
	var persons []models.Person
	collection := m.DB.Database("test").Collection("people")
	fmt.Println("collection",*collection)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		fmt.Println("error at collection find",err)
		return persons,err
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var p models.Person
		cursor.Decode(&p)
		persons = append(persons, p)
	}
	if err := cursor.Err(); err != nil {
		return persons,err

	}
	return persons,nil
}