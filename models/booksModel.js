const NodeCache = require('node-cache');
const connectionFactory = require('../startup/db');

const cache = new NodeCache();
module.exports = {
    async getAllBooks(filter) {
        const cacheKey = JSON.stringify(filter);
        const cachedValue = cache.get(cacheKey);
        if (cachedValue) {
            return cachedValue;
        }
        const connection = connectionFactory();
        const baseQuery = 'SELECT * FROM books';
        const keys = [];
        const values = [];
        for (const key in filter) {
            keys.push(`${key} = ?`);
            values.push(filter[key]);
        }
        const whereClause = keys.join(' AND ');
        const result = await connection.query(`${baseQuery} ${whereClause && ' WHERE ' + whereClause}`, values).then((result) => result);
        connection.end();
        cache.set(cacheKey, result);
        return result;
    },

    async createBook(book) {
        const connection = connectionFactory();
        const result = await connection.query('INSERT INTO books SET ?;', book);
        connection.end();
        return {
            ...book,
            id: result.insertId
        };
    },

    async updateBook(id, updates) {
        const connection = connectionFactory();
        const result = await connection.query('UPDATE books SET ? WHERE ?;', [updates, { id }]);
        connection.end();
        return result;
    }
};