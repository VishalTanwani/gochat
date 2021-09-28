package models

import (
	"time"
	"go.mongodb.org/mongo-driver/bson/primitive"
)


//User is user model
type User struct{
	ID primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email string             `json:"email,omitempty" bson:"email,omitempty"`
	Name string             `json:"name,omitempty" bson:"name,omitempty"`
	CreatedAt time.Time  `json:"create_at,omitempty" bson:"create_at,omitempty"`
	UpdatedAt time.Time  `json:"update_at,omitempty" bson:"update_at,omitempty"`
}