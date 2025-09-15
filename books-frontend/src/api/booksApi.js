import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api/books',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getBooks = () => api.get('');
export const getBook = (id) => api.get(`/${id}`);
export const createBook = (book) => api.post('', book);
export const updateBook = (id, book) => api.put(`/${id}`, book);
export const deleteBook = (id) => api.delete(`/${id}`);

export default api;
