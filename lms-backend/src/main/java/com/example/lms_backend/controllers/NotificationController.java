package com.example.lms_backend.controllers;

import com.example.lms_backend.models.NotificationRecords;
import com.example.lms_backend.services.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/add-notification-record")
    public NotificationRecords createNotification(@RequestBody NotificationRecords notificationRecord) {
        System.out.println(notificationRecord);
        return notificationService.saveNotificationRecord(notificationRecord);
    }
}
