package com.example.lms_backend.models;

import lombok.Data;

@Data
public class TopBookStats {

    private String bookId;
    private long count;
    private String title;
    private String author;
}
