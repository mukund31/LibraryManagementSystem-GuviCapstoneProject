package com.example.lms_backend.repositories;

import com.example.lms_backend.models.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends MongoRepository<Book, String> {

    @Query("{ 'title': { $regex: ?0, $options: 'i' } }")
    List<Book> findByTitleRegex(String title);
    @Query("{ 'author': { $regex: ?0, $options: 'i' } }")
    List<Book> findByAuthorRegex(String author);
    @Query("{ 'genre': { $regex: ?0, $options: 'i' } }")
    List<Book> findByGenreRegex(String genre);

    Optional<Book> findById(String bookId);

    Page<Book> findAll(Pageable pageable);
}
