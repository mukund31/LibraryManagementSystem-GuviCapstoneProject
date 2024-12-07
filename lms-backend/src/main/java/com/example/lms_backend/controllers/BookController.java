package com.example.lms_backend.controllers;


import com.example.lms_backend.models.Book;
import com.example.lms_backend.models.SearchLogs;
import com.example.lms_backend.repositories.BookRepository;
import com.example.lms_backend.services.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Page<Book> getBooks(@RequestParam int page, @RequestParam int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findAll(pageable);
    }

    @GetMapping("/unique-count")
    public long getTotalUniqueBooksCount() {
        return bookService.getTotalUniqueBooksCount();
    }

    @GetMapping("/count")
    public long getTotalBooksCount() {
        return bookService.getTotalBooksCount();
    }

    @PostMapping("/search")
    public List<Book> searchBooks(@RequestBody SearchLogs searchLogs) {
//        System.out.println(searchLogs);
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
    public ResponseEntity<?> addBook(@RequestBody Book book) {
        try {
//            if (book.getCoverImageBase64() != null) {
//                byte[] imageData = Base64.getDecoder().decode(
//                        book.getCoverImageBase64().split(",")[1]);
//                book.setImageData(imageData);
//            }

            bookRepository.save(book);

            return ResponseEntity.ok(book);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Invalid request: " + e.getMessage());
        }
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
            book.setCoverImageBase64(bookDetails.getCoverImageBase64());

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
