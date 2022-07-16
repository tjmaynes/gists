import React from 'react';

const getPathFromString = (str) => str.toLowerCase().split('_');

const getNestedObject = (nestedObj, pathArr) => {
    return pathArr.reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined, nestedObj);
}

const Table = ({ headings, data }) => {
    const TableHeadMarkup = ({ headData }) => {
        return (
            <tr key="heading">
                {headData.map((head, index) => (<th key={index} className="Cell">{head}</th>))}
            </tr>
        );
    }

    const TableRowMarkup = ({ keys, rowData }) => {
        return (
            <tr key={rowData.id}>
                {keys.map((key, index) => {
                    const path = getPathFromString(key);
                    const content = getNestedObject(rowData, path);
                    return (<td key={index} className="Cell">{content}</td>)
                })}
            </tr>
        );
    }

    const TableBodyMarkup = ({ keys, bodyData }) => {
        return bodyData.map(body => (<TableRowMarkup key={body.id} keys={keys} rowData={body} />));
    }

    return (
        <table className="Table">
            <thead>
                <TableHeadMarkup headData={headings} />
            </thead>
            <tbody>
                <TableBodyMarkup keys={headings} bodyData={data} />
            </tbody>
        </table>
    )
}

export default Table;
