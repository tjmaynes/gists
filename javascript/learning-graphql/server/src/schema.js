const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve: ({id}, _, cxt) => cxt.getAllBooksByAuthorIdResolver(id)
        }
    })
});

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve: ({author_id}, _, ctx) => ctx.getAuthorByIdResolver(author_id)
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }, cxt) => cxt.getBookByIdResolver(id)
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (_parent, _args, cxt) => cxt.getAllBooksResolver()
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve: (_, { id }, cxt) => cxt.getAuthorByIdResolver(id)
        },
        authors: {
            type: new GraphQLList(AuthorType),
            args: { id: { type: GraphQLID } },
            resolve: (_parent, _args, cxt) => cxt.getAllAuthorsResolver()
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve: (_parent, args, cxt) => cxt.addAuthorResolver(args)
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                author_id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (_parent, args, cxt) => cxt.addBookResolver(args)
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});;
