package main

import (
	"fmt"
	"log"
	"os"

	"github.com/Debsnil24/PexelAPI-Go.git/controller"
	"github.com/joho/godotenv"
)

func init() {
	err := godotenv.Load("/Users/debsnilsamudra/Documents/Program/PexelAPI-Go/.env")
	if err != nil {
		log.Fatal("Unable to Load .env file", err)
	}
	controller.PhotoApi = os.Getenv("PHOTO_API")
	controller.VideoApi = os.Getenv("VIDEO_API")
}

func main() {
	Token := os.Getenv("PEXEL_TOKEN")

	var c = controller.NewClient(Token)

	result, err := c.SearchVideo("waves", 15, 1)
	if err != nil {
		log.Fatal("Search Error: ", err)
	}

	if result.Page == 0 {
		fmt.Println("No Results Found")
	}

	fmt.Println(result)
	fmt.Println(c.RemainingTime)
}
