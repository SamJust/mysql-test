const NodeCache = require('node-cache');
const connectionFactory = require('./db');

const cache = new NodeCache();
module.exports = {
    async getAllBooks({ sort, limit, offset, ...filter}) {
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
        let extras = '';
        if (sort) {
            extras += `ORDER BY ?`;
            values.push(sort);
        }
        if (limit) {
            if (offset) {
                extras += 'LIMIT ?, ?';
                values.push(--offset, --limit);
            } else {
                extras += 'LIMIT ?';
                values.push(--limit);
            }
        }
        const query = `${baseQuery}${whereClause && ' WHERE ' + whereClause} ${extras}`;
        const result = await connection.query(query, values).then((result) => result);
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