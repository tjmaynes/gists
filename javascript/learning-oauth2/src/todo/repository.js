export class TodoRepository {
    constructor(db) {
        this.db = db;
    }

    async getTodos(userId) {
        return this.db.exec({
            query: "SELECT * FROM todo WHERE user_id = $1",
            values: [userId]
        });
    }

    async getTodo({ id, user_id }) {
        return this.db.exec({
            query: "SELECT * FROM todo WHERE id = $1, AND user_id = $2",
            values: [id, user_id]
        });
    }

    async addTodo({ user_id, title, content }) {
        return this.db.exec({
            query: "INSERT INTO todo(user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
            values: [user_id, title, content]
        });
    }

    async updateTodo({ id, user_id, title, content }) {
        return this.db.exec({
            query: "UPDATE todo SET user_id = $2, title = $3, content = $4 WHERE id = $1 AND user_id = $2",
            values: [id, user_id, title, content]
        });
    }

    async removeTodo({ id, user_id }) {
        return this.db.exec({
            query: "DELETE FROM todo WHERE id = $1 AND user_id = $2",
            values: [id, user_id]
        });
    }
}
