# PexelAPI-Go

A Fullstack Project to Implement a Pexel clone using React and Go
The app allows users to search both photos and videos, curated photo and popular videos, and random photo and video. It follows a clean architecture with API routes handling all of these requests.

Refer to the [Tech Stack](#Tech-Stack) section for list of technologies used in this project
## Project Structure

![Server Side](https://uml.planttext.com/plantuml/png/TP193iCW303ll0Bv0RmXNt63IwE2NR7qKkNl9NHHau9FCACHo5FA67C9Njrmlg8Z3QTw8BQW7qhN-V9PE4Vndk97RNDU_CuP9z3akgyloBQRliMe2xZmVxJHOI6MVEeqZO-gA2NtljVuiNefGto7dxiJKzyua5G2g5LDTQDroqy0)

![Client Side](https://uml.planttext.com/plantuml/png/VPF1JiCm38RlUOggz_KP1fD078OcJN0tYKSZqYPoN3Q4-kvaosW9QPRZ_tzExD_AsZCG3vqH3kG7l6DL7yZsZBsggszHXJCPdkIlbkWRspdROy_-hvqWp_3v1hIQoF_W-Hoq2UJsvMb_r2pRXlsfBa0UWMHx3zH8xqlGVeAocqQHuvk1W57jMiishuZCWxMC2_TTMqUbOMiLc9l4BYHI0c9E9VVIsoDfLGIi6mpGgrPOd276Sgk9Itd-p9XltlENmMph2tbcQqhoBBXpMWNWcbR1JS98c7cIIDuvbmApd2GGvGvqlwGJWkILToOys9opom0xCFgvT1IZM8UF5dxV3m00)

![Frontend Workflow](https://uml.planttext.com/plantuml/png/XLD1JiCm4Bpx5LPEgGGVu81AMq2LAAGKUb_YRMFLjIFRAStlsIIkarG8Rj5wPZmptaoT1-khesAGUsFvfqFBlaob1TYQlyBf2opBZVRMAFvGbl5xWs3p8eCznb5M66-UhHHnifK2nvCL2WaB2Shi6MelVSsJ3Cz8ujcIfpF83wZ5966iSS9lxuC7ViSVjKVhmiLyNQ6jMJWa67aZp1oKShm0BHHsmBcI-I4zWQhmXhjsz85dFs4DWNXz3gA_qztz7Msuw6C4d1V6E7JalScSS6ekQSCcR80ZLko4ICjTn3jKc7iKL-ZOLq1taZsQzNA4_hKuOWRD1khIBlAsoJzXlVw_z1PwHOzT35Er1Jk-F3PjZVmDtffmRoLglZ825F-MlWY4A3cC7YJRqTZp4BMJMipG-NK5YlReHUf3UXNnRmUTFXk2Bfpmp0lfIWLrDsENbNaoXZPnSBmnET5vuy2nAVL8_zCF)

![Backend Workflow](https://uml.planttext.com/plantuml/svg/TP91JiCm44NtFiMe2mIBN20Br19e2r8WIejOZv91jMBiO8_L7XyxCIIfnCxHFFzvtyhQCLhsNqgmP4LGqONKfdhETWOUiEb8j_1XRFUfp5a8RDXOU7TaHH-koKRsg1bMjV5C5cvtnagb44f_kLi1EXW7ItYFkbLaXtawBu72QBP6gPWOLA1GaZIFWTDiUMVmTX3m0Hi_XOYgaDqdZnmEiS_-UAoWfczFZaLI3qnooM5hx1bj-uUaGMIczJaKg5HS22NnoRHYfXt8qI274Zk2ZUTJg20RP9foatDsbLiJUwlXvV3s6iwkDzhH8dpkMg5r13TZiKTad6ndjPzqOrgwYlnj7hZuJFyi5kkG7FwF7m00)
# API Reference

## Get All Photos

```http
GET /api/photo/search
```

| Parameter | Type     | Description                          |
|-----------|---------|--------------------------------------|
| `query`   | `string` | **Required**: Search term for photos |
| `per_page`   | `number` | **Required**: Number of photos per page |
| `page`   | `number` | **Required**: Page Number |

Fetches a list of photos based on a search query.

## Get Curated Photos

```http
GET /api/photo/curated
```

Fetches a list of curated photos.

## Get Photo by ID

```http
GET /api/photo/id
```

| Parameter | Type     | Description                    |
|-----------|---------|--------------------------------|
| `id`      | `string` | **Required**: ID of the photo |

Fetches a specific photo based on the provided ID.

## Get Random Photo

```http
GET /api/photo/random
```

Fetches a random photo from the database.

## Search Videos

```http
GET /api/video/search
```

| Parameter | Type     | Description                           |
|-----------|---------|---------------------------------------|
| `query`   | `string` | **Required**: Search term for photos |
| `per_page`   | `number` | **Required**: Number of photos per page |
| `page`   | `number` | **Required**: Page Number |

Fetches a list of videos based on a search query.

## Get Popular Videos

```http
GET /api/video/popular
```

Fetches a list of trending/popular videos.

## Get Random Video

```http
GET /api/video/random
```

Fetches a random video from the database.

## Get Remaining API Requests

```http
GET /api/requests
```

Fetches the remaining API request quota.


## Router Configuration (Golang)

```go
package router

import (
	"github.com/Debsnil24/PexelAPI-Go.git/handler"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	r := mux.NewRouter()
	
	r.HandleFunc("/api/photo/search", handler.SearchPhotos).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/photo/curated", handler.CuratedPhotos).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/photo/id", handler.GetPhotoByID).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/photo/random", handler.GetRandomPhoto).Methods("GET", "OPTIONS")

	r.HandleFunc("/api/video/search", handler.SearchVideo).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/video/popular", handler.PopularVideo).Methods("GET", "OPTIONS")
	r.HandleFunc("/api/video/random", handler.GetRandomVideo).Methods("GET", "OPTIONS")

	r.HandleFunc("/api/requests", handler.GetRemainingReq).Methods("GET", "OPTIONS")

	return r
}
```

## Run Locally

#### Clone the project

```bash
  git clone https://github.com/Debsnil24/PexelAPI-Go.git
```

#### Go to the project directory

```bash
  cd PexelAPI-Go
```

#### Install dependencies for the React Frontend

```bash
  cd frontend
```

```bash
  npm install
```

#### Install dependencies for the Go Backend

```bash
  cd backend
```

```go
  go mod tidy
```

#### Start the server
* Make sure to update the path to .env in main.go

```bash
  cd backend
```
```go
  go run main.go
```
```bash
  cd frontend
```
```bash
  npm run dev
```



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the backend folder and fill in the necessary details

`PEXEL_TOKEN`

`PHOTO_API`

`VIDEO_API`


## Test Docs

[Testing Documentation](https://docs.google.com/document/d/e/2PACX-1vQb9JPCOKLj70kmoWbgNcGSAV144VT5zzKaQFQmoTELYSESOBuLUseGDqXTEtxEYIjvIIncCW-g6Q8s/pub)


## Tech-Stack

**Client:** React, Joy UI, Tanstack Query, Axios

**Server:** Go, Gorilla Mux

**API Host:** Pexel API


## Acknowledgements
The Project is based on the working with external API backend project by Akhil Sharma 

Follow the link to the original Video
 - [Consume Pexels API With GOLANG](https://youtu.be/P-wPx6jmFnM?si=5nDHizs54Glx-wS3)

