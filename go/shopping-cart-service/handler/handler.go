package handler

import (
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	handlers "github.com/tjmaynes/tdd-go/handler/http"
)

// Initialize ..
func Initialize(cartHandler *handlers.CartHandler, healthCheckHandler *handlers.HealthCheckHandler) http.Handler {
	router := chi.NewRouter()
	router.Use(
		middleware.Recoverer,
		middleware.Logger,
	)

	router.Route("/", func(rt chi.Router) {
		rt.Mount("/cart", addCartRouter(cartHandler))
		rt.Get("/health", healthCheckHandler.GetHealthCheckHandler)
	})

	return router
}

func addCartRouter(cartHandler *handlers.CartHandler) http.Handler {
	router := chi.NewRouter()

	router.Get("/", cartHandler.GetCartItems)
	router.Get("/{id:[0-9]+}", cartHandler.GetCartItemByID)
	router.Post("/", cartHandler.AddCartItem)
	router.Put("/{id:[0-9]+}", cartHandler.UpdateCartItem)
	router.Delete("/{id:[0-9]+}", cartHandler.RemoveCartItem)

	return router
}
