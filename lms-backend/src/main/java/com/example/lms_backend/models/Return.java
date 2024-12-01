package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "returns")
public class Return {

    @Id
    private String returnId;
    private String borrowId;
    private Date returnDate;
    private int penaltyAmount;
    private String processedBy;
}
