package com.example.lms_backend.services;

import com.example.lms_backend.models.NotificationRecords;
import com.example.lms_backend.repositories.Notificationrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private Notificationrepository notificationRepository;

    public NotificationRecords saveNotificationRecord(NotificationRecords notificationRecord) {
//        System.out.println(notificationRecord);
        return notificationRepository.save(notificationRecord);
    }
}
