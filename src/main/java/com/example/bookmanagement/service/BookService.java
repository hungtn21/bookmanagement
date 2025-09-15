package com.example.bookmanagement.service;

import com.example.bookmanagement.model.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {
    List<Book> getAllBooks();
    Optional<Book> getBookById(Long id);
    Book saveBook(Book book);       // dùng cho cả create & update
    void deleteBook(Long id);
}
