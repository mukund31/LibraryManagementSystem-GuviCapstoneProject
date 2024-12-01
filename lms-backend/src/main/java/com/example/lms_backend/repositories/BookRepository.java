package com.example.lms_backend.repositories;

import com.example.lms_backend.models.Book;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    List<Book> findByTitleRegex(String query);
    List<Book> findByAuthorRegex(String author);
    List<Book> findByGenreRegex(String genre);
}
