package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "borrowingHistory")
public class BorrowingHistory {

    @Id
    private String historyId;
    private String userId;
    private String bookId;
    private String borrowId;
    private Date borrowDate;
    private Date returnDate;
    private double penaltyPaid;
}
