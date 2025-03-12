package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Debsnil24/PexelAPI-Go.git/controller"
	"github.com/Debsnil24/PexelAPI-Go.git/handler"
	"github.com/Debsnil24/PexelAPI-Go.git/router"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load("/Users/debsnilsamudra/Documents/Program/PexelAPI-Go/backend/.env")
	if err != nil {
		log.Fatal("Unable to Load .env file", err)
	}
	controller.PhotoApi = os.Getenv("PHOTO_API")
	controller.VideoApi = os.Getenv("VIDEO_API")
	handler.Token = os.Getenv("PEXEL_TOKEN")
	handler.C = controller.NewClient(handler.Token)
}

func main() {
	// cmd := exec.Command("npm", "start")
	// cmd.Dir = "/Users/debsnilsamudra/Documents/Program/React-Go-ToDo/frontend"
	// err := cmd.Start()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	r := router.Router()
	err := http.ListenAndServe(":9000", r)
	if err != nil {
		log.Fatalf("Error: Unable to start Webserver at port 9000 \n %v", err)
	} else {
		fmt.Println("The Webserver has started at port :9000")
	}
}
