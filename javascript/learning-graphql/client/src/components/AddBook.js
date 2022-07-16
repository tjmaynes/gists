import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries';
import { InputField, SelectField } from './Fields';

class AddBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: '',
            genre: '',
            author_id: ''
        };
    }

    submitForm(e) {
        e.preventDefault();
        const { name, genre, author_id } = this.state;
        if (name.length > 0 && genre.length > 0 && author_id.length > 0) {
            this.props.addBookMutation({
                variables: {
                    name: name,
                    genre: genre,
                    author_id: author_id
                },
                refetchQueries: [{
                    query: getBooksQuery
                }]
            });
        }
    }

    render() {
        const { loading, authors } = this.props.getAuthorsQuery;
        if (loading) {
            return (<div>Loading Authors...</div>);
        } else {
            const authorOptions = authors.reduce((accum, currentAuthor) => {
                accum.push({value: currentAuthor.id, text: currentAuthor.name});
                return accum;
            }, []);

            return (
                <form id="add-book" onSubmit={this.submitForm.bind(this)}>
                    <InputField key="book" labelText="Title:" onChange={(e) => this.setState({
                        name: e.target.value
                    })} />
                    <InputField key="genre" labelText="Genre:" onChange={(e) => this.setState({
                        genre: e.target.value
                    })} />
                    <SelectField labelText="Author:" options={authorOptions} onChange={(e) => this.setState({
                        author_id: e.target.value
                    })} />
                    <button>+</button>
                </form>
            )
        }
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
