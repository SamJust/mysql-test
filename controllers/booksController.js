const {
    getAllBooks,
    createBook,
    updateBook
} = require('../models/booksModel');

module.exports = {
    async get(ctx) {
        ctx.body = await getAllBooks(ctx.request.query);
    },

    async post(ctx) {
        const { body: book } = ctx.request;
        ctx.body =  await createBook(book);
    },

    async put(ctx) {
        const { body: book } = ctx.request;
        const { id } = ctx.params;
        ctx.body = await updateBook(id, book);
    }
};