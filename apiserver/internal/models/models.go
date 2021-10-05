package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

//User is user model
type User struct {
	ID           primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Email        string             `json:"email,omitempty" bson:"email,omitempty"`
	Name         string             `json:"name,omitempty" bson:"name,omitempty"`
	ProfileImage string             `json:"profile_image,omitempty" bson:"profile_image,omitempty"`
	Status       string             `json:"status,omitempty" bson:"status,omitempty"`
	Token        string             `json:"token,omitempty" bson:"token,omitempty"`
	LastLogin    []int64            `json:"last_login,omitempty" bson:"last_login,omitempty"`
	CreatedAt    int64              `json:"create_at,omitempty" bson:"create_at,omitempty"`
	UpdatedAt    int64              `json:"update_at,omitempty" bson:"update_at,omitempty"`
}

//UserRegister is for login model
type UserRegister struct {
	Email string
	Code  string
}

//Room is room model
type Room struct {
	ID          primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name        string             `json:"name,omitempty" bson:"name,omitempty"`
	Description string             `json:"description,omitempty" bson:"description,omitempty"`
	Users       []string           `json:"users,omitempty" bson:"users,omitempty"`
	CreatedBy   string             `json:"create_by,omitempty" bson:"create_by,omitempty"`
	CreatedAt   int64              `json:"create_at,omitempty" bson:"create_at,omitempty"`
	UpdatedAt   int64              `json:"update_at,omitempty" bson:"update_at,omitempty"`
}

//RoomWithToken is room model
type RoomWithToken struct {
	Name  string `json:"name,omitempty" bson:"name,omitempty"`
	Token string `json:"token,omitempty" bson:"token,omitempty"`
}
