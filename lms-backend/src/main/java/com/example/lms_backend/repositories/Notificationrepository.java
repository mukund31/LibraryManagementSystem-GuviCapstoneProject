package com.example.lms_backend.repositories;

import com.example.lms_backend.models.NotificationRecords;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Notificationrepository extends MongoRepository<NotificationRecords, String> {
}
