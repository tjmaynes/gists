module.exports = ({
    authorService,
    bookService
}) => ({
    addAuthorResolver: (author) => authorService.add(author),
    getAuthorByIdResolver: (id) => authorService.getById(id),
    getAllAuthorsResolver: () => authorService.getAll(),
    addBookResolver: (book) => bookService.add(book),
    getBookByIdResolver: (id) => bookService.getById(id),
    getAllBooksByAuthorIdResolver: (author_id) => bookService.getByAuthorId(author_id),
    getAllBooksResolver: () => bookService.getAll()
});
