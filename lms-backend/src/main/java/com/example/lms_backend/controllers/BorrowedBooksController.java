package com.example.lms_backend.controllers;

import com.example.lms_backend.models.Book;
import com.example.lms_backend.models.BorrowedBooks;
import com.example.lms_backend.repositories.BookRepository;
import com.example.lms_backend.repositories.BorrowedBooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class BorrowedBooksController {

    @Autowired
    private BorrowedBooksRepository borrowedBooksRepository;

    @Autowired
    private BookRepository bookRepository;

    @PostMapping("/borrow")
    public ResponseEntity<String> borrowBook(@RequestParam String userId, @RequestParam String bookId) {
        // Check if the book exists and is available
        Book book = bookRepository.findById(bookId).orElse(null);
        if (book == null || book.getCopiesAvailable() <= 0) {
            return ResponseEntity.status(400).body("Book is not available.");
        }

        Date borrowDate = new Date();
        Date dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 14);  // Add 14 days for due date

        BorrowedBooks borrowedBooks = new BorrowedBooks(
                userId,
                bookId,
                borrowDate,
                dueDate,
                "borrowed"
        );

        borrowedBooksRepository.save(borrowedBooks);

        // Update book availability
        book.setCopiesAvailable(book.getCopiesAvailable() - 1);
        bookRepository.save(book);

        return ResponseEntity.ok("Book borrowed successfully. Due date: " + dueDate.toString());
    }


    @PostMapping("/return")
    public ResponseEntity<String> returnBook(@RequestBody Map<String, String> requestBody) {
        String borrowId = requestBody.get("borrowId");

        // Find the borrowed book record
        BorrowedBooks borrowedBooks = borrowedBooksRepository.findById(borrowId).orElse(null);
        if (borrowedBooks == null || !borrowedBooks.getStatus().equals("borrowed")) {
            return ResponseEntity.status(404).body("Borrow record not found.");
        }

        // Mark the book as returned
        borrowedBooks.setStatus("returned");
        borrowedBooksRepository.save(borrowedBooks);

        // Update book availability
        Book book = bookRepository.findById(borrowedBooks.getBookId()).orElse(null);
        if (book != null) {
            book.setCopiesAvailable(book.getCopiesAvailable() + 1);
            bookRepository.save(book);
        }

        return ResponseEntity.ok("Book returned successfully.");
    }
}
