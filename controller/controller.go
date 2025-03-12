package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"math/rand/v2"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/Debsnil24/PexelAPI-Go.git/models"
)
var PhotoApi = os.Getenv("PHOTO_API")
var VideoApi = os.Getenv("VIDEO_API")
type Client struct {
	*models.Client
}

func NewClient(token string) *Client {
	c := http.Client{}
	return &Client{&models.Client{Token: token, HC: c}}
}

func (c *Client)requestDoWithAuth(method, url string) (*http.Response, error) {
	req, err := http.NewRequest(method, url, nil)
	if err != nil {
		return nil, err
	}

	req.Header.Add("Authorization", c.Token)
	resp, err := c.HC.Do(req)
	if err != nil {
		return resp, err
	}
	times, err := strconv.Atoi(resp.Header.Get("X-Ratelimit-Remaining"))
	if err != nil {
		return resp, err
	} else {
		c.RemainingTime = int32(times)
	}
	return resp, err
}

func (c *Client)SearchPhotos(query string, perPage, page int) (*models.SearchResult, error) {
	url := fmt.Sprintf(PhotoApi+"/search?query=%s&per_page=%d&page=%d",query,perPage,page)

	response, err := c.requestDoWithAuth("GET", url)
	if err != nil{
		return nil, err
	}
	defer response.Body.Close()

	data, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	var result models.SearchResult
	err = json.Unmarshal(data, &result)
	return &result, err
}

func (c *Client)CuratedPhotos(perPage, page int) (*models.CuratedResult, error) {
	url := fmt.Sprintf(PhotoApi+"/curated?per_page=%d&page=%d",perPage,page)

	response, err := c.requestDoWithAuth("GET", url)
	if err != nil{
		return nil, err
	}
	defer response.Body.Close()

	data, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}
	
	var result models.CuratedResult
	err = json.Unmarshal(data, &result)
	return &result, err
}

func (c *Client)GetPhoto(id int32) (*models.Photo, error) {
	url := fmt.Sprintf(PhotoApi+"/photos/%d", id)

	response, err := c.requestDoWithAuth("GET", url)
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	data, err := io.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	var result models.Photo
	err = json.Unmarshal(data, &result)
	return &result, err
}

func (c *Client)GetRandomPhoto() (*models.Photo, error) {
	rand.New(rand.NewPCG(uint64(time.Now().UnixNano()), uint64(time.Now().UnixNano() >> 32)))
	randNum := rand.IntN(1001)
	result, err := c.CuratedPhotos(1,randNum)
	if err == nil && len(result.Photos) == 1 {
		return &result.Photos[0], nil
	}
	return nil, err
}