import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
{
    authors {
        id
        name
    }
}
`;

const getBooksQuery = gql`
{
    books {
        id
        name
        genre
        author {
            id
            name
        }
    }
}
`;

const addBookMutation = gql`
mutation($name: String!, $genre: String!, $author_id: ID!) {
    addBook(name: $name, genre: $genre, author_id: $author_id) {
        id
        name
    }
}
`;


export { getAuthorsQuery, getBooksQuery, addBookMutation };
