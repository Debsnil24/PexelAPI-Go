package models

import "net/http"

type Client struct {
	Token         string
	HC            http.Client
	RemainingTime int32
}

type SearchResult struct {
	Page         int32   `json:"page"`
	PerPage      int32   `json:"per_page"`
	TotalResults int32   `json:"total_results"`
	NextPage     int32   `json:"next_page"`
	Photos       []Photo `json:"photos"`
}

type Photo struct {
	ID              int32       `json:"id"`
	Width           int32       `json:"width"`
	Height          int32       `json:"height"`
	URL             string      `json:"url"`
	Photographer    string      `json:"photographer"`
	PhotographerURL string      `json:"photographer_url"`
	Src             PhotoSource `json:"src"`
}

type PhotoSource struct {
	Original  string `json:"original"`
	Large     string `json:"large"`
	Large2x   string `json:"large2x"`
	Medium    string `json:"medium"`
	Small     string `json:"small"`
	Potrait   string `json:"potrait"`
	Square    string `json:"square"`
	Landscape string `json:"landscape"`
	Tiny      string `json:"tiny"`
}

type CuratedResult struct {
	Page         int32   `json:"page"`
	PerPage      int32   `json:"per_page"`
	NextPage     int32   `json:"next_page"`
	Photos       []Photo `json:"photos"`
}
