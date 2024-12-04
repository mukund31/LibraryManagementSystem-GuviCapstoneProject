package com.example.lms_backend.models;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "books")
public class Book {

    @Id
    private String bookId;
    private String title;
    private String author;
    private String genre;
    private int publicationYear;
    private String isbn;
    private int copiesAvailable;
    private String location;

//    private byte[] imageData;
    private String coverImageBase64;
}
