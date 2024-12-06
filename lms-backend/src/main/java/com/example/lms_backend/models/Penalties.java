package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "penalties")
public class Penalties {

    @Id
    private String penaltyId;
    private String userId;
    private double amount;
    private String reason;
    private Date dateIssued;
    private String status;
}
