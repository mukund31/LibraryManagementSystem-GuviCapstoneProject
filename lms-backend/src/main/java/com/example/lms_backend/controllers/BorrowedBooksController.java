package com.example.lms_backend.controllers;

import com.example.lms_backend.models.Book;
import com.example.lms_backend.models.BorrowedBooks;
import com.example.lms_backend.repositories.BookRepository;
import com.example.lms_backend.repositories.BorrowedBooksRepository;
import com.example.lms_backend.services.BorrowBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class BorrowedBooksController {

    @Autowired
    private BorrowedBooksRepository borrowedBooksRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BorrowBookService borrowBookService;

    @GetMapping("/checked-out-books-count")
    public long getCheckedOutBooksCount() {
        return borrowBookService.getCheckedOutBooksCount();
    }

    @GetMapping("/borrowed-books-list")
    public List<BorrowedBooks> getAllBorrowedBooks(@RequestHeader("Authorization") String token) {
        return borrowedBooksRepository.findByStatus("borrowed");
    }

    @GetMapping("/overdue-books-count")
    public long getOverdueBooksCount() {
        return borrowBookService.getOverdueBooksCount();
    }

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

        borrowedBooks.setTitle(book.getTitle());
        borrowedBooksRepository.save(borrowedBooks);

        // Update book availability
        book.setCopiesAvailable(book.getCopiesAvailable() - 1);
        bookRepository.save(book);

        String check="Book borrowed successfully. Due date: " + dueDate.toString();
//        System.out.println(check);
        return ResponseEntity.ok("Book borrowed successfully. Due date: " + dueDate.toString());
    }


    @PostMapping("/return")
    public ResponseEntity<String> returnBook(@RequestBody Map<String, String> requestBody) {
        String borrowId = requestBody.get("borrowId");

        BorrowedBooks borrowedBooks = borrowedBooksRepository.findById(borrowId).orElse(null);
        if (borrowedBooks == null || !borrowedBooks.getStatus().equals("borrowed")) {
            return ResponseEntity.status(404).body("Borrow record not found.");
        }

        borrowedBooks.setStatus("returned");
        borrowedBooks.setReturnDate(new Date());


        LocalDate borrowDate = borrowedBooks.getBorrowDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        LocalDate returnDate = borrowedBooks.getReturnDate().toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
        int daysOverDue = (int)ChronoUnit.DAYS.between(borrowDate, returnDate);
        borrowedBooks.setOverdueFine(daysOverDue);
        borrowedBooksRepository.save(borrowedBooks);

        Book book = bookRepository.findById(borrowedBooks.getBookId()).orElse(null);
        if (book != null) {
            book.setCopiesAvailable(book.getCopiesAvailable() + 1);
            bookRepository.save(book);
        }

        return ResponseEntity.ok("Book returned successfully.");
    }


    @GetMapping("/{userId}/borrowing-history")
    public ResponseEntity<List<BorrowedBooks>> getBorrowingHistory(@PathVariable String userId) {
        List<BorrowedBooks> books = borrowBookService.getBorrowingHistory(userId);
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{userId}/total-borrowed-books")
    public long getTotalBorrowedBooks(@PathVariable String userId) {
        return borrowBookService.getTotalBorrowedBooks(userId);
    }

    @GetMapping("/{userId}/total-penalties")
    public double getTotalPenaltiesPaid(@PathVariable String userId) {
        return borrowBookService.getTotalPenaltiesPaid(userId);
    }
}
