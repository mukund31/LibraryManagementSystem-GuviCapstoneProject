package com.example.lms_backend.controllers;


import com.example.lms_backend.models.Book;
import com.example.lms_backend.models.SearchLogs;
import com.example.lms_backend.repositories.BookRepository;
import com.example.lms_backend.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:4200")
public class BookController {

    @Autowired
    private final BookRepository bookRepository;

    @Autowired
    private final BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/unique-count")
    public long getTotalUniqueBooksCount() {
        return bookService.getTotalUniqueBooksCount();
    }

    @GetMapping("/count")
    public long getTotalBooksCount() {
        return bookService.getTotalBooksCount();
    }

//    @GetMapping("/search")
//    public List<Book> searchBooks(@RequestParam String query) {
//        return bookService.searchBooks(query);
//    }

    @PostMapping("/search")
    public List<Book> searchBooks(@RequestBody SearchLogs searchLogs) {
        System.out.println(searchLogs);
        return bookService.searchBooks(searchLogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Optional<Book> book = bookRepository.findById(id);
        if (book.isPresent()) {
            return ResponseEntity.ok(book.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        book.setTitle(book.getTitle().toLowerCase());
        book.setGenre(book.getGenre().toLowerCase());
        book.setAuthor(book.getAuthor().toLowerCase());
        Book savedBook = bookRepository.save(book);
//        System.out.println(savedBook);
        return ResponseEntity.ok(savedBook);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book bookDetails) {
        Optional<Book> existingBook = bookRepository.findById(id);
        if (existingBook.isPresent()) {
            Book book = existingBook.get();
            book.setTitle(bookDetails.getTitle());
            book.setAuthor(bookDetails.getAuthor());
            book.setGenre(bookDetails.getGenre());
            book.setPublicationYear(bookDetails.getPublicationYear());
            book.setIsbn(bookDetails.getIsbn());
            book.setCopiesAvailable(bookDetails.getCopiesAvailable());
            book.setLocation(bookDetails.getLocation());

            Book updatedBook = bookRepository.save(book);
            return ResponseEntity.ok(updatedBook);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
