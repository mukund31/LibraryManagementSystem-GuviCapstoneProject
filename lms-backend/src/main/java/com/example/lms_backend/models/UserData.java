package com.example.lms_backend.models;

import lombok.Data;

@Data
public class UserData {
    private String userId;
    private String name;
    private String address;
    private String preferedGenres;
    private String profileImageBase64;

    private String username;
    private String password;
    private String role;
    private String email;
    private long phoneNum;
    private boolean isActive;
}
