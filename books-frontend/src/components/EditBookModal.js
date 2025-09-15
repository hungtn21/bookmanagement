import React, { useState, useEffect } from 'react';

export default function EditBookModal({ show, book, onClose, onSave }) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (book) {
            setTitle(book.title || '');
            setAuthor(book.author || '');
            setPrice(book.price != null ? book.price : '');
        }
    }, [book]);

    if (!show) return null;

    const handleSave = async () => {
        if (!title.trim() || !author.trim()) return alert('Title và Author là bắt buộc');
        const payload = { title: title.trim(), author: author.trim(), price: price === '' ? null : Number(price) };
        await onSave(book.id, payload);
    };

    return (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Book</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-2">
                            <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <input className="form-control" value={author} onChange={e => setAuthor(e.target.value)} />
                        </div>
                        <div className="mb-2">
                            <input className="form-control" value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
