package com.example.lms_backend.services;

import com.example.lms_backend.models.BorrowedBooks;
import com.example.lms_backend.models.BorrowingHistory;
import com.example.lms_backend.repositories.BorrowedBooksRepository;
import com.example.lms_backend.repositories.BorrowingHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class BorrowingHistoryService {

    @Autowired
    private BorrowingHistoryRepository borrowingHistoryRepository;

    @Autowired
    private BorrowedBooksRepository borrowedBooksRepository;

    public BorrowingHistory saveBorrowingHistory(BorrowingHistory borrowingHistory) {
//        System.out.println("Ser: "+borrowingHistory);

        Optional<BorrowedBooks> borrowedBooksOptional = borrowedBooksRepository.findById(borrowingHistory.getBorrowId());

        if (borrowedBooksOptional.isPresent()) {
            BorrowedBooks borrowedBook = borrowedBooksOptional.get();
            borrowingHistory.setBorrowDate(borrowedBook.getBorrowDate());
            borrowingHistory.setReturnDate(new Date());
            return borrowingHistoryRepository.save(borrowingHistory);
        } else {
            throw new RuntimeException("Borrowed book not found for borrowId: " + borrowingHistory.getBorrowId());
        }
    }
}
