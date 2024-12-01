package com.example.lms_backend.services;

import com.example.lms_backend.models.BorrowedBooks;
import com.example.lms_backend.repositories.BorrowedBooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class BorrowBook {
    @Autowired
    private BorrowedBooksRepository borrowedBookRepository;

    public List<BorrowedBooks> getBorrowingHistory(String userId) {
        List<BorrowedBooks> borrowedBooks = borrowedBookRepository.findByUserId(userId);
        return borrowedBooks;
    }

    private long calculateOverdueDays(LocalDate dueDate, LocalDate returnDate) {
        if (returnDate != null && returnDate.isAfter(dueDate)) {
            return Duration.between(dueDate.atStartOfDay(), returnDate.atStartOfDay()).toDays();
        }
        return 0;
    }

    public double getTotalPenaltiesPaid(String userId) {
        List<BorrowedBooks> borrowedBooks = borrowedBookRepository.findByUserId(userId);
        return borrowedBooks.stream()
                .filter(book -> "returned".equals(book.getStatus()))
                .mapToDouble(book -> calculateOverdueDays(book.getDueDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate(), book.getReturnDate().toInstant()
                        .atZone(ZoneId.systemDefault())
                        .toLocalDate()))
                .sum();
    }

    public long getTotalBorrowedBooks(String userId) {
        return borrowedBookRepository.countByUserId(userId);
    }
}
