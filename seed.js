const {
    createBook
} = require('./models/booksModel');
console.log('starting insertion');

let items = 0;
const total = 100000;
const iteration = 100;
const interval = setInterval(() => {
    const queries = [];

    for (let i = 0; i < iteration; i++) {
        const book = {
            author: Math.random().toString(36).substring(7),
            title: Math.random().toString(36).substring(7),
            releaseDate: Math.random().toString(36).substring(7),
            description: Math.random().toString(36).substring(7),
            image: Math.random().toString(36).substring(7)
        };
        queries.push(createBook(book));
    }

    Promise.all(queries).then(() => {
        items+=iteration;
        if (items >= total) {
            clearInterval(interval);
            console.log('finished seeding');
        } else {
            console.log(`${items} of ${total}`);
        }
    });
}, 5000);