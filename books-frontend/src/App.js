import React, { useEffect, useState } from 'react';
import { getBooks, createBook, updateBook, deleteBook } from './api/booksApi';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import EditBookModal from './components/EditBookModal';

function App() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editBook, setEditBook] = useState(null);
    const [showEdit, setShowEdit] = useState(false);
    const [error, setError] = useState(null);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const resp = await getBooks();
            setBooks(resp.data);
        } catch (err) {
            console.error(err);
            setError('Không thể load books. Kiểm tra backend.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadBooks(); }, []);

    const handleCreate = async (payload) => {
        try {
            await createBook(payload);
            await loadBooks();
        } catch (err) {
            console.error(err);
            alert('Tạo sách thất bại');
        }
    };

    const handleEdit = (book) => {
        setEditBook(book);
        setShowEdit(true);
    };

    const handleSaveEdit = async (id, payload) => {
        try {
            await updateBook(id, payload);
            setShowEdit(false);
            setEditBook(null);
            await loadBooks();
        } catch (err) {
            console.error(err);
            alert('Cập nhật thất bại');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBook(id);
            await loadBooks();
        } catch (err) {
            console.error(err);
            alert('Xóa thất bại');
        }
    };

    return (
        <div className="container py-4">
            <h1 className="mb-4">📚 Book Management</h1>

            <BookForm onCreate={handleCreate} />

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? <p>Loading...</p> : (
                <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
            )}

            <EditBookModal
                show={showEdit}
                book={editBook}
                onClose={() => { setShowEdit(false); setEditBook(null); }}
                onSave={handleSaveEdit}
            />
        </div>
    );
}

export default App;
