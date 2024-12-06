package com.example.lms_backend.services;

import com.example.lms_backend.models.PlatformAccess;
import com.example.lms_backend.repositories.PlatformAccessRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class PlatformAccessService {

    private final PlatformAccessRepository platformAccessRepository;

    public PlatformAccessService(PlatformAccessRepository platformAccessRepository) {
        this.platformAccessRepository = platformAccessRepository;
    }

    public void logAccess(String userId, String deviceType) {
        Optional<PlatformAccess> existingAccess = platformAccessRepository.findByUserIdAndDeviceType(userId, deviceType);

        if (existingAccess.isPresent()) {
            PlatformAccess access = existingAccess.get();
            access.setLastAccessed(new Date());
            platformAccessRepository.save(access);
        } else {
            PlatformAccess newAccess = new PlatformAccess();
            newAccess.setUserId(userId);
            newAccess.setDeviceType(deviceType);
            newAccess.setLastAccessed(new Date());
            platformAccessRepository.save(newAccess);
        }
    }
}
