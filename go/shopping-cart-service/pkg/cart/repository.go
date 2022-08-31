package cart

import (
	"context"
	"database/sql"
)

// Repository ..
type Repository interface {
	GetItems(ctx context.Context, page int64, pageSize int64) ([]Item, error)
	GetItemByID(ctx context.Context, id int64) (Item, error)
	AddItem(ctx context.Context, item *Item) (Item, error)
	UpdateItem(ctx context.Context, item *Item) (Item, error)
	RemoveItem(ctx context.Context, id int64) (int64, error)
}

// NewRepository ..
func NewRepository(DBConn *sql.DB) Repository {
	return &repository{DBConn: DBConn}
}

// repository ..
type repository struct {
	DBConn *sql.DB
}

// GetItems ..
func (r *repository) GetItems(ctx context.Context, page int64, pageSize int64) ([]Item, error) {
	limit := pageSize
	offset := page * pageSize

	rows, err := r.DBConn.QueryContext(ctx, "SELECT id, name, price, manufacturer FROM cart ORDER BY id LIMIT $1 OFFSET $2", limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	payload := make([]Item, 0)
	for rows.Next() {
		data := new(Item)
		err := rows.Scan(&data.ID, &data.Name, &data.Price, &data.Manufacturer)
		if err != nil {
			return nil, err
		}
		payload = append(payload, *data)
	}

	return payload, nil
}

// GetItemByID ..
func (r *repository) GetItemByID(ctx context.Context, id int64) (Item, error) {
	var item Item
	row := r.DBConn.QueryRowContext(ctx, "SELECT id, name, price, manufacturer FROM cart WHERE id = $1", id)
	err := row.Scan(&item.ID, &item.Name, &item.Price, &item.Manufacturer)
	if err != nil {
		return Item{}, err
	}

	return item, nil
}

// AddItem ..
func (r *repository) AddItem(ctx context.Context, item *Item) (Item, error) {
	var insertedID int64
	insertStm := "INSERT INTO cart (name, price, manufacturer) VALUES ($1, $2, $3) RETURNING ID"
	err := r.DBConn.QueryRowContext(ctx, insertStm, item.Name, item.Price, item.Manufacturer).Scan(&insertedID)
	if err != nil {
		return Item{}, err
	}

	return Item{
		ID:           insertedID,
		Name:         item.Name,
		Price:        item.Price,
		Manufacturer: item.Manufacturer,
	}, nil
}

// UpdateItem ..
func (r *repository) UpdateItem(ctx context.Context, item *Item) (Item, error) {
	tx, err := r.DBConn.BeginTx(ctx, nil)
	if err != nil {
		return Item{}, err
	}

	_, err = tx.ExecContext(ctx, "UPDATE cart SET name = $1, price = $2, manufacturer = $3 WHERE id = $4", item.Name, item.Price, item.Manufacturer, item.ID)
	if err != nil {
		tx.Rollback()
		return Item{}, err
	}

	err = tx.Commit()
	if err != nil {
		tx.Rollback()
		return Item{}, err
	}

	return *item, nil
}

// RemoveItem ..
func (r *repository) RemoveItem(ctx context.Context, id int64) (int64, error) {
	stmt, err := r.DBConn.PrepareContext(ctx, "DELETE FROM cart WHERE id = $1")
	if err != nil {
		return id, err
	}
	defer stmt.Close()

	_, err = stmt.ExecContext(ctx, id)
	if err != nil {
		return id, err
	}

	return id, nil
}
