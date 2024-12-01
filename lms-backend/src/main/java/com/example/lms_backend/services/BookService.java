package com.example.lms_backend.services;

import com.example.lms_backend.models.Book;
import com.example.lms_backend.repositories.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public List<Book> searchBooks(String title, String author, String genre) {
        if (title != null && !title.isEmpty()) {
            return bookRepository.findByTitleRegex(".*" + title + ".*");
        }
        if (author != null && !author.isEmpty()) {
            return bookRepository.findByAuthorRegex(author);
        }
        if (genre != null && !genre.isEmpty()) {
            return bookRepository.findByGenreRegex(genre);
        }
        return bookRepository.findAll();
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
