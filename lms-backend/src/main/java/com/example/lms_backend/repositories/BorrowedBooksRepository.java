package com.example.lms_backend.repositories;

import com.example.lms_backend.models.BorrowedBooks;
import com.example.lms_backend.models.TopBookStats;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface BorrowedBooksRepository extends MongoRepository<BorrowedBooks, String> {
    long countByUserId(String userId);

    List<BorrowedBooks> findByUserId(String userId);

    List<BorrowedBooks> findByDueDateBeforeAndStatus(LocalDate date, String status);

    @Aggregation(pipeline = {
            "{ '$group': { '_id': '$bookId', 'count': { '$sum': 1 } } }",
            "{ '$sort': { 'count': -1 } }",
            "{ '$project': { 'bookId': '$_id', 'count': 1, '_id': 0 } }"  // Rename '_id' to 'bookId'
    })
    List<TopBookStats> findTopPerformingBooks();

    long countByStatus(String status);

    long countByStatusAndBorrowDateBefore(String borrowed, Date overdueDateConverted);

    List<BorrowedBooks> findByStatus(String status);
}
