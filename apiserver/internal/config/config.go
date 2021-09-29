package config

import (
	"log"
)

//AppConfig hold the application config
type AppConfig struct {
	InfoLog  *log.Logger
	ErrorLog *log.Logger
}
