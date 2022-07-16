const AuthorService = require('./author_service');
const BookService = require('./book_service');
const DbWrapper = require('./db_wrapper');
const schema = require('./schema');
const getResolvers = require('./resolvers');

const getDiContainer = ({dbURI}) => {
    const dbWrapper = new DbWrapper(dbURI, console);

    const authorRepository = dbWrapper.createRepository('Author', {
        name: String,
        age: Number
    });
    const authorService = new AuthorService(authorRepository);

    const bookRepository = dbWrapper.createRepository('Book', {
        name: String,
        genre: String,
        author_id: String
    });
    const bookService = new BookService(bookRepository);

    const resolvers = getResolvers({
        authorService: authorService,
        bookService: bookService
    });

    return Promise.resolve({
        schema: schema,
        resolvers: resolvers,
        dbWrapper: dbWrapper
    });
};

module.exports = getDiContainer;
