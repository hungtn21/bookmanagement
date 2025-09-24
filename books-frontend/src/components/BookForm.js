import React, { useState } from 'react';

export default function BookForm({ onCreate }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !author.trim()) return alert('Title và Author là bắt buộc');

        const payload = {
            title: title.trim(),
            author: author.trim(),
            price: price === '' ? null : Number(price)
        };

        await onCreate(payload);
        setTitle(''); setAuthor(''); setPrice('');
    };

    return (
        <form onSubmit={onSubmit} className="mb-4">
            <div className="row g-2">
                <div className="col-md-4">
                    <input className="form-control" placeholder="Title" value={title}
                           onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="col-md-4">
                    <input className="form-control" placeholder="Author" value={author}
                           onChange={e => setAuthor(e.target.value)} required />
                </div>
                <div className="col-md-2">
                    <input className="form-control" placeholder="Price" value={price}
                           onChange={e => setPrice(e.target.value)} type="number" step="0.01" />
                </div>
                <div className="col-md-2">
                    <button className="btn btn-primary w-100" type="submit">Add Book</button>
                </div>
            </div>
        </form>
    );
}
