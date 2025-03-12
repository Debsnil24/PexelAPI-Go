package router

import (
	"github.com/Debsnil24/PexelAPI-Go.git/handler"
	"github.com/gorilla/mux"
)

func Router() *mux.Router {
	r := mux.NewRouter();
	r.HandleFunc("/api/photo/search",handler.SearchPhotos).Methods("GET","OPTIONS")
	r.HandleFunc("/api/photo/curated",handler.CuratedPhotos).Methods("GET","OPTIONS")
	r.HandleFunc("/api/photo/id",handler.GetPhotoByID).Methods("GET","OPTIONS")
	r.HandleFunc("/api/photo/random",handler.GetRandomPhoto).Methods("GET","OPTIONS")
	r.HandleFunc("/api/video/search",handler.SearchVideo).Methods("GET","OPTIONS")
	r.HandleFunc("/api/video/popular",handler.PopularVideo).Methods("GET","OPTIONS")
	r.HandleFunc("/api/video/random",handler.GetRandomVideo).Methods("GET","OPTIONS")
	r.HandleFunc("/api/requests",handler.GetRemainingReq).Methods("GET","OPTIONS")
	return r
}