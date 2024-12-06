package com.example.lms_backend.services;

import com.example.lms_backend.models.Penalties;
import com.example.lms_backend.repositories.PenaltyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PenaltyService {

    @Autowired
    private PenaltyRepository penaltyRepository;

    public Penalties savePenaltyRecord(Penalties penalty) {
        return penaltyRepository.save(penalty);
    }
}
