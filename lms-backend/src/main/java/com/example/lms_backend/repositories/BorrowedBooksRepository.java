package com.example.lms_backend.repositories;

import com.example.lms_backend.models.BorrowedBooks;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BorrowedBooksRepository extends MongoRepository<BorrowedBooks, String> {
}
