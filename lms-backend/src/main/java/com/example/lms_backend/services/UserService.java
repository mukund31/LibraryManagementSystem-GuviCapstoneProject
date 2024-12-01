package com.example.lms_backend.services;

import com.example.lms_backend.models.User;
import com.example.lms_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public long getTotalUsers() {
        return userRepository.count();
    }
}
