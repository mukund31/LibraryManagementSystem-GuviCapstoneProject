package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "notificationRecords")
public class NotificationRecords {
    @Id
    private String notificationId;
    private String userId;
    private String bookId;
    private String message;
    private String notificationType;
    private Date timestamp;
}
