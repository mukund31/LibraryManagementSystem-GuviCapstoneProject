package com.example.lms_backend.services;

import com.example.lms_backend.models.Return;
import com.example.lms_backend.repositories.ReturnRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReturnService {

    @Autowired
    private ReturnRepository returnRepository;

    public Return saveReturn(Return returnRecord) {
        return returnRepository.save(returnRecord);
    }
}
