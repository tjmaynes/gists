package api

import (
	"bytes"
	"context"
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"strings"
	"testing"

	"github.com/icrowley/fake"
	driver "github.com/tjmaynes/tdd-go/driver"
	cart "github.com/tjmaynes/tdd-go/pkg/cart"
)

var (
	dbConnectionString = flag.String("DATABASE_URL", os.Getenv("DATABASE_URL"), "Database source such as ./db/my.db.")
	seedDataSource     = flag.String("SEED_DATA_SOURCE", os.Getenv("SEED_DATA_SOURCE"), "Seed data source, such as ./cmd/data.json.")
	dbConn             = getDbConn()
)

func Test_HealthCheckEndpoint_WhenDatabaseConnectionIsAlive_ReturnsPong(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	request, err := http.NewRequest("GET", "/health", nil)
	if err != nil {
		t.Fatal(err)
	}

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusOK != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusOK, recorder.Code)
	}

	if body := recorder.Body.String(); body != `{"message":"PONG!"}` {
		t.Errorf("Expected a PONG! message. Got %s", body)
	}
}

func Test_CartEndpoint_WhenUnsupportedMethodIsGiven_Returns405(t *testing.T) {
	flag.Parse()

	var tests = []struct {
		httpMethod string
		endpoint   string
	}{
		{"PUT", "/cart"},
		{"POST", "/cart/123"},
	}

	for _, tt := range tests {
		a := NewAPI(*dbConnectionString)

		request, err := http.NewRequest(tt.httpMethod, tt.endpoint, nil)
		if err != nil {
			t.Fatal(err)
		}

		recorder := httptest.NewRecorder()
		a.Handler.ServeHTTP(recorder, request)

		if http.StatusMethodNotAllowed != recorder.Code {
			t.Errorf("Expected response code %d. Got %d\n", http.StatusOK, recorder.Code)
		}
	}
}

func Test_CartEndpoint_GetItems_WhenItemsExist_ShouldReturnAllItems(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	ctx := context.Background()
	cartRepository := cart.NewRepository(dbConn)

	pageSize := int64(5)
	page := int64(0)

	requestURL := fmt.Sprintf("/cart?page=%d&pageSize=%d", 0, 5)
	request, err := http.NewRequest("GET", requestURL, nil)
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusOK != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusOK, recorder.Code)
	}

	expectedItems, _ := cartRepository.GetItems(ctx, page, pageSize)
	expected := createResponseBody(expectedItems)

	if body := recorder.Body.String(); body != expected {
		t.Errorf("Expected an array of cart items. Got %s instead of %s", body, expected)
	}

	teardownDatabase(ctx)
}

func Test_CartEndpoint_GetItemByID_WhenItemExists_ShouldReturnItem(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	ctx := context.Background()
	cartRepository := cart.NewRepository(dbConn)
	items := setupDatabase(ctx, cartRepository)

	item1 := items[0]
	requestURL := fmt.Sprintf("/cart/%d", item1.ID)

	request, err := http.NewRequest("GET", requestURL, nil)
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusOK != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusOK, recorder.Code)
	}

	expected := createResponseBody(item1)

	if body := recorder.Body.String(); body != expected {
		t.Errorf("Expected an array of cart items. Got %s", body)
	}

	teardownDatabase(ctx)
}

func Test_CartEndpoint_GetItemByID_WhenItemDoesNotExist_ShouldReturn404(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	request, err := http.NewRequest("GET", "/cart/-1", nil)
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusNotFound != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusNotFound, recorder.Code)
	}
}

func Test_CartEndpoint_AddItem_WhenGivenValidItem_ShouldReturnItem(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	ctx := context.Background()
	cartRepository := cart.NewRepository(dbConn)

	setupDatabase(ctx, cartRepository)

	itemName := fake.ProductName()
	itemPrice := cart.Decimal(99)
	itemManufacturer := fake.Brand()
	newItem := cart.Item{Name: itemName, Price: itemPrice, Manufacturer: itemManufacturer}

	form := url.Values{}
	form.Add("name", newItem.Name)
	form.Add("price", fmt.Sprintf("%d", newItem.Price))
	form.Add("manufacturer", newItem.Manufacturer)

	request, err := http.NewRequest("POST", "/cart", strings.NewReader(form.Encode()))
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusCreated != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusCreated, recorder.Code)
	}

	var result struct {
		Data cart.Item `json:"data"`
	}
	err = json.Unmarshal([]byte(recorder.Body.String()), &result)
	if err != nil {
		t.Fatal(err)
	}

	newItem.ID = result.Data.ID

	if result.Data != newItem {
		t.Errorf("Expected a cart item %+v. Got %+v", newItem, result.Data)
	}

	teardownDatabase(ctx)
}

func Test_CartEndpoint_AddItem_WhenGivenInvalidItem_ShouldReturnBadRequest(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	form := url.Values{}
	form.Add("name", "")
	form.Add("price", "")
	form.Add("manufacturer", "")

	request, err := http.NewRequest("POST", "/cart", strings.NewReader(form.Encode()))
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusBadRequest != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusBadGateway, recorder.Code)
	}
}

func Test_CartEndpoint_UpdateItem_WhenGivenValidItemAndItemExists_ShouldReturnUpdatedItem(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	ctx := context.Background()
	cartRepository := cart.NewRepository(dbConn)
	items := setupDatabase(ctx, cartRepository)

	newItem := items[0]

	jsonRequest, _ := json.Marshal(map[string]string{
		"name":         newItem.Name,
		"price":        fmt.Sprintf("%d", newItem.Price),
		"manufacturer": newItem.Manufacturer,
	})

	requestURL := fmt.Sprintf("/cart/%d", newItem.ID)

	request, err := http.NewRequest("PUT", requestURL, bytes.NewReader(jsonRequest))
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusOK != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusOK, recorder.Code)
	}

	var result struct {
		Data cart.Item `json:"data"`
	}
	err = json.Unmarshal([]byte(recorder.Body.String()), &result)
	if err != nil {
		t.Fatal(err)
	}

	if result.Data != newItem {
		t.Errorf("Expected a cart item %+v. Got %+v", newItem, result.Data)
	}

	teardownDatabase(ctx)
}

func Test_CartEndpoint_UpdateItem_WhenGivenValidItemAndItemDoesNotExist_ShouldReturnUpdatedItem(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	unknownItem := cart.Item{
		ID:           2,
		Name:         "Random Item",
		Price:        12000,
		Manufacturer: "Random Manufacturer",
	}

	jsonRequest, _ := json.Marshal(map[string]string{
		"name":         unknownItem.Name,
		"price":        fmt.Sprintf("%d", unknownItem.Price),
		"manufacturer": unknownItem.Manufacturer,
	})

	requestURL := fmt.Sprintf("/cart/%d", unknownItem.ID)

	request, err := http.NewRequest("PUT", requestURL, bytes.NewReader(jsonRequest))
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusNotFound != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusNotFound, recorder.Code)
	}
}

func Test_CartEndpoint_UpdateItem_WhenGivenInvalidItem_ShouldReturnBadRequest(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	jsonRequest, _ := json.Marshal(map[string]string{
		"name":         "",
		"price":        "",
		"manufacturer": "",
	})

	request, err := http.NewRequest("PUT", "/cart/0", bytes.NewReader(jsonRequest))
	if err != nil {
		t.Fatal(err)
	}
	request.Header.Set("Content-Type", "application/json")

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusBadRequest != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusBadRequest, recorder.Code)
	}
}

func Test_CartEndpoint_RemoveItem_WhenItemExists_ShouldReturnOkResponse(t *testing.T) {
	flag.Parse()

	a := NewAPI(*dbConnectionString)

	ctx := context.Background()
	cartRepository := cart.NewRepository(dbConn)
	items := setupDatabase(ctx, cartRepository)

	newItem := items[1]

	requestURL := fmt.Sprintf("/cart/%d", newItem.ID)

	request, err := http.NewRequest("DELETE", requestURL, nil)
	if err != nil {
		t.Fatal(err)
	}

	recorder := httptest.NewRecorder()
	a.Handler.ServeHTTP(recorder, request)

	if http.StatusOK != recorder.Code {
		t.Errorf("Expected response code %d. Got %d\n", http.StatusOK, recorder.Code)
	}

	teardownDatabase(ctx)
}

func createResponseBody(items interface{}) string {
	out, err := json.Marshal(items)
	if err != nil {
		panic(err)
	}
	return fmt.Sprintf(`{"data":%s}`, out)
}

func getDbConn() *sql.DB {
	dbConn, err := driver.ConnectDB(*dbConnectionString)
	if err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}

	return dbConn
}

func setupDatabase(ctx context.Context, cartRepository cart.Repository) []cart.Item {
	flag.Parse()

	jsonFile, err := os.Open(*seedDataSource)
	if err != nil {
		fmt.Println(err)
		os.Exit(-1)
	}
	defer jsonFile.Close()

	jsonBytes, _ := ioutil.ReadAll(jsonFile)

	var rawItems []cart.Item
	err = json.Unmarshal([]byte(jsonBytes), &rawItems)
	if err != nil {
		panic(err)
	}

	createDatabase(ctx)

	var items []cart.Item
	for _, rawItem := range rawItems {
		item, err := cartRepository.AddItem(ctx, &rawItem)
		if err != nil {
			panic(err)
		}
		items = append(items, item)
	}

	return items
}

func createDatabase(ctx context.Context) {
	stmt, err := dbConn.PrepareContext(ctx, `
		CREATE TABLE cart (
			id SERIAL PRIMARY KEY,
			name VARCHAR (255) NOT NULL,
			price BIGINT NOT NULL,
			manufacturer VARCHAR (255) NOT NULL
		)
	`)
	if err != nil {
		return
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx)
	if err != nil {
		return
	}

	return
}

func teardownDatabase(ctx context.Context) {
	stmt, err := dbConn.PrepareContext(ctx, "DROP TABLE cart")
	if err != nil {
		return
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx)
	if err != nil {
		return
	}

	return
}
