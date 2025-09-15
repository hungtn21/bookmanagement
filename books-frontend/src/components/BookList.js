import React from 'react';

export default function BookList({ books, onEdit, onDelete }) {
    if (!books || books.length === 0) return <p>No books found.</p>;

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>ID</th><th>Title</th><th>Author</th><th>Price</th><th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {books.map(b => (
                <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.title}</td>
                    <td>{b.author}</td>
                    <td>{b.price != null ? Number(b.price).toFixed(2) : '-'}</td>
                    <td>
                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(b)}>Edit</button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => {
                            if (window.confirm(`Delete "${b.title}"?`)) onDelete(b.id);
                        }}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
