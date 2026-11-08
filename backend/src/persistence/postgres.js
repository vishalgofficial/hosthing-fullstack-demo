const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 5 });
module.exports = {
    async init() {
        await pool.query('CREATE TABLE IF NOT EXISTS todo_items (id uuid PRIMARY KEY, name text NOT NULL, completed boolean NOT NULL DEFAULT false)');
    },
    async teardown() { await pool.end(); },
    async getItems() { return (await pool.query('SELECT id, name, completed FROM todo_items ORDER BY id')).rows; },
    async getItem(id) { return (await pool.query('SELECT id, name, completed FROM todo_items WHERE id=$1', [id])).rows[0]; },
    async storeItem(item) { await pool.query('INSERT INTO todo_items(id,name,completed) VALUES($1,$2,$3)', [item.id,item.name,item.completed]); },
    async updateItem(id,item) { await pool.query('UPDATE todo_items SET name=$1, completed=$2 WHERE id=$3', [item.name,item.completed,id]); },
    async removeItem(id) { await pool.query('DELETE FROM todo_items WHERE id=$1', [id]); },
};
