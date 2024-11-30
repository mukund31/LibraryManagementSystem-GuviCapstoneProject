package com.example.lms_backend.services;

import com.example.lms_backend.models.User;
import com.example.lms_backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    public String registerUser(User user) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(user.getUsername());
            if(userOpt.isPresent()) {
                return "User Already Exists";
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setActive(true);
            userRepository.save(user);
            return "User registered successfully!";
        }
        catch(Exception e) {
            return "Server Error";
        }
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//        userRepository.save(user);
//        return "User registered successfully!";
    }

    public boolean validateUser(String username, String password) {
        try {
            Optional<User> userOpt = userRepository.findByUsername(username);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                boolean isValid = passwordEncoder.matches(password, user.getPassword());
                return isValid;
            }
            return false;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getUserRole(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        return userOpt.map(User::getRole).orElse("user");
    }

}
