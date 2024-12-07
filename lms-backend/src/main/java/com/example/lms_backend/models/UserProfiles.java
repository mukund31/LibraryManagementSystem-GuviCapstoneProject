package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "userProfiles")
public class UserProfiles {
    @Id
    private String userId;
    private String name;
    private String address;
    private String preferedGenres;
    private String profileImageBase64;
}
