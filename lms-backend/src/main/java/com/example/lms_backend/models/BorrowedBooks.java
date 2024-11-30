package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "borrowedBooks")
public class BorrowedBooks {
    @Id
    private String borrowId;

    private String userId;
    private String bookId;
    private Date borrowDate;
    private Date dueDate;
    private String status;

    public BorrowedBooks(String userId, String bookId, Date borrowDate, Date dueDate, String status) {
        this.userId = userId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.dueDate = dueDate;
        this.status = status;
    }
}
