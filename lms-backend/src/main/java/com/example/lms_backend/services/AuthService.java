package com.example.lms_backend.services;

import com.example.lms_backend.models.User;
import com.example.lms_backend.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder=new BCryptPasswordEncoder();
    private final String secretKey = "30cf8e906ff43acaa9fd01cd4cef20a382ba5114a4b54dfe4b7ade7d7eebee2be0b7dfac17522123077f7698316b45245e7781e704ffb4192c5ef926665c43b236a95fb9f554078f19cc34924212955c09df46229ce3dc880c71e2cd8ff1f0b28ea3d336d3a424f2564158b30cb2a7778e1aacc91c08f71f16ee6f74b0c81c4888cdb040bdf97ca3d6dab6c4a020e9b3c397ac0e6c604df1e8ae2ca6abc9ee872da3af6dfe2827de6b8df764f32f1dfae43eadc8869514044de8cc545026bfdf160a7bab3e0f26010afb9fede3165f6987c00561d31a99fa2e69e29e02d7ce634b2efe09d229de7a7315f1426f4958b7c0e4df572632767767b009afb2e810b7";

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
        return userOpt.map(User::getRole).orElse("ROLE_User");
    }

    public String getUserId(String username) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        return userOpt.map(User::getId).orElse("");
    }

    public String getUserId() {
        String token = getTokenFromContext();
        if (token != null) {
            try {
                Claims claims = Jwts.parser()
                        .setSigningKey(secretKey.getBytes())
                        .parseClaimsJws(token)
                        .getBody();
                return (String) claims.get("userId");
            } catch (Exception e) {
                System.err.println("Token parsing error: " + e.getMessage());
            }
        }
        return null;
    }

    private String getTokenFromContext() {
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            Object credentials = SecurityContextHolder.getContext().getAuthentication().getCredentials();
            if (credentials instanceof String) {
                String authHeader = (String) credentials;
                if (authHeader.startsWith("Bearer ")) {
                    return authHeader.substring(7); // Remove "Bearer " prefix
                }
            }
        }
        return null;
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
