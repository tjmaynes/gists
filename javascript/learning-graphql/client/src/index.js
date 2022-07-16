import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <App apiUri='http://localhost:4000/graphql' />,
    document.getElementById('root')
);
