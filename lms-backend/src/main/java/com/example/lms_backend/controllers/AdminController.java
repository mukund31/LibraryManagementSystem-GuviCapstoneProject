package com.example.lms_backend.controllers;

import com.example.lms_backend.models.Book;
import com.example.lms_backend.models.BorrowedBooks;
import com.example.lms_backend.models.TopBookStats;
import com.example.lms_backend.models.User;
import com.example.lms_backend.repositories.BookRepository;
import com.example.lms_backend.repositories.BorrowedBooksRepository;
import com.example.lms_backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private BorrowedBooksRepository borrowedBooksRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserService userService;

    @GetMapping("/admin-dashboard")
    public String adminDashboard() {
        return "Admin dashboard";
    }

    @GetMapping("user-count")
    public long getTotalUsers() {
        return userService.getTotalUsers();
    }

    @GetMapping("/overdue-books")
    public List<BorrowedBooks> getOverdueBooks() {
//        LocalDate today = LocalDate.now().plusDays(16); // 16 added to check working
        LocalDate today = LocalDate.now()   ;
        List<BorrowedBooks> overDueBooks = borrowedBooksRepository.findByDueDateBeforeAndStatus(today, "borrowed");
        for (BorrowedBooks borrowedBook : overDueBooks) {
            Book book = bookRepository.findById(borrowedBook.getBookId()).orElse(null);
            if (book != null) {
                borrowedBook.setTitle(book.getTitle());
            }
        }
        return overDueBooks;
    }

    @GetMapping("/top-performing-books")
    public List<TopBookStats> getTopPerformingBooks() {
        List<TopBookStats> topBooks = borrowedBooksRepository.findTopPerformingBooks();

        for (TopBookStats stats : topBooks) {
            if (stats.getBookId() != null) {
                Book book = bookRepository.findById(stats.getBookId()).orElse(null);
                if (book != null) {
                    stats.setTitle(book.getTitle());
                    stats.setAuthor(book.getAuthor());
                } else {
                    stats.setTitle("Unknown Book");
                }
            } else {
                stats.setTitle("Unknown Book");
            }
        }

        return topBooks;
    }


    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        User user = userService.getUserById(userId);

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
