package handler

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Debsnil24/PexelAPI-Go.git/controller"
)

var Token string
var C *controller.Client

func SearchPhotos(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	perPageStr := r.URL.Query().Get("per_page")
	pageStr := r.URL.Query().Get("page")

	perPage, err := strconv.Atoi(perPageStr)
	if err != nil {
		http.Error(w, "Invalid per_page value", http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		http.Error(w, "Invalid page value", http.StatusBadRequest)
		return
	}

	result, err := C.SearchPhotos(query, perPage, page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func CuratedPhotos(w http.ResponseWriter, r *http.Request) {
	perPageStr := r.URL.Query().Get("per_page")
	pageStr := r.URL.Query().Get("page")

	perPage, err := strconv.Atoi(perPageStr)
	if err != nil {
		http.Error(w, "Invalid per_page value", http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		http.Error(w, "Invalid page value", http.StatusBadRequest)
		return
	}

	result, err := C.CuratedPhotos(perPage, page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func GetPhotoByID(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")

	id, err := strconv.Atoi(ID)
	if err != nil {
		http.Error(w, "Invalid per_page value", http.StatusBadRequest)
		return
	}

	result, err := C.GetPhoto(int32(id))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func GetRandomPhoto(w http.ResponseWriter, r *http.Request) {
	result, err := C.GetRandomPhoto()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func SearchVideo(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	perPageStr := r.URL.Query().Get("per_page")
	pageStr := r.URL.Query().Get("page")

	perPage, err := strconv.Atoi(perPageStr)
	if err != nil {
		http.Error(w, "Invalid per_page value", http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		http.Error(w, "Invalid page value", http.StatusBadRequest)
		return
	}

	result, err := C.SearchVideo(query, perPage, page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func PopularVideo(w http.ResponseWriter, r *http.Request) {
	perPageStr := r.URL.Query().Get("per_page")
	pageStr := r.URL.Query().Get("page")

	perPage, err := strconv.Atoi(perPageStr)
	if err != nil {
		http.Error(w, "Invalid per_page value", http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(pageStr)
	if err != nil {
		http.Error(w, "Invalid page value", http.StatusBadRequest)
		return
	}

	result, err := C.PopularVideo(perPage, page)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func GetRandomVideo(w http.ResponseWriter, r *http.Request) {
	result, err := C.GetRandomVideo()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func GetRemainingReq(w http.ResponseWriter, r *http.Request) {
	result := C.GetRemainingRequest()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)

}
