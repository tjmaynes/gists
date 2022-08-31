package handler

import (
	"database/sql"
	jsonHandler "github.com/tjmaynes/tdd-go/handler/json"
	"net/http"
)

// NewHealthCheckHandler ..
func NewHealthCheckHandler(dbConn *sql.DB) *HealthCheckHandler {
	return &HealthCheckHandler{DbConn: dbConn}
}

// HealthCheckHandler ..
type HealthCheckHandler struct {
	DbConn *sql.DB
}

// GetHealthCheckHandler ..
func (h *HealthCheckHandler) GetHealthCheckHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, http.StatusText(405), 405)
		return
	}

	if err := h.DbConn.Ping(); err != nil {
		http.Error(w, http.StatusText(500), 500)
	} else {
		jsonHandler.CreateResponse(w, http.StatusOK, map[string]string{"message": "PONG!"})
	}
}
