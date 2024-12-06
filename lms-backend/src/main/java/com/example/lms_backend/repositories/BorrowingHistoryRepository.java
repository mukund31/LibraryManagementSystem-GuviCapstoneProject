package com.example.lms_backend.repositories;

import com.example.lms_backend.models.BorrowingHistory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BorrowingHistoryRepository extends MongoRepository<BorrowingHistory, String> {
}
