package com.example.lms_backend.repositories;

import com.example.lms_backend.models.PlatformAccess;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlatformAccessRepository extends MongoRepository<PlatformAccess, String> {


    Optional<PlatformAccess> findByUserIdAndDeviceType(String userId, String deviceType);
}

