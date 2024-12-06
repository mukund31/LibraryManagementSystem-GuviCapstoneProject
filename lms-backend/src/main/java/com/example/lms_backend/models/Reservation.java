package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "reservations")
public class Reservation {

    @Id
    private String reservationId;
    private String userId;
    private String bookId;
    private Date reservationDate;
    private String status;
}
