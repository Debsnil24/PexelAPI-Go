package controller

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

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