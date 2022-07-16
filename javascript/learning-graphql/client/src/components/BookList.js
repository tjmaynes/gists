import React from 'react';
import { graphql } from 'react-apollo';
import Table from './Table';
import { getBooksQuery } from '../queries';

const BookList = ({ data }) => {
    const { loading, books } = data;
    if (loading) {
        return (<div>Loading books...</div>);
    } else {
        return (
            <div>
                <h2>Book List</h2>
                <Table headings={["ID", "AUTHOR_ID", "AUTHOR_NAME", "NAME", "GENRE"]} data={books} />
            </div>
        );
    }
}

export default graphql(getBooksQuery)(BookList);
