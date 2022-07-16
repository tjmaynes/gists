class BookService {
    constructor(repository) {
        this.repository = repository;
    }

    add(book) {
        return this.repository.findOneAndUpdate(
            { name: book.name }, book, { upsert: true }
        );
    }

    getById(id) {
        return this.repository.findById(id);
    }

    getByAuthorId(author_id) {
        return this.repository.find({ author_id: author_id });
    }

    getAll() {
        return this.repository.find({});
    }
}

module.exports = BookService;
