package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document(collection = "platformAccess")
public class PlatformAccess {

    @Id
    private String platformId;
    private String userId;
    private String deviceType;
    private Date lastAccessed;
}
