package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Document("searchLogs")
public class SearchLogs {
    @Id
    private String searchId;
    private String userId;
    private String searchQuery;
    private boolean inTitle;
    private boolean inAuthor;
    private boolean inGenre;
    private Date date;
    private long resultCount;
}
