package driver

import (
	"fmt"
	"time"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

//DB will hold the data base connection
type DB struct{
	Mongo *mongo.Client
}

var dbConn = &DB{}

//ConnectMongo will create mongo db pool  
func ConnectMongo(uri string) (*DB,error){
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, err := mongo.Connect(ctx, options.Client().ApplyURI(uri))
	if err !=nil {
		fmt.Println("error at connceting mongo",err)
		return nil,err
	}
	dbConn.Mongo = client
	return dbConn,err

}