package com.example.lms_backend.repositories;

import com.example.lms_backend.models.BorrowedBooks;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BorrowedBooksRepository extends MongoRepository<BorrowedBooks, String> {
    long countByUserId(String userId);

    List<BorrowedBooks> findByUserId(String userId);
}
