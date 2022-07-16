class AuthorService {
    constructor(repository) {
        this.repository = repository;
    }

    add(author) {
        return this.repository.findOneAndUpdate(
            { name: author.name }, author, { upsert: true }
        );
    }

    getById(id) {
        return this.repository.findById(id);
    }

    getAll() {
        return this.repository.find({});
    }
}

module.exports = AuthorService;
