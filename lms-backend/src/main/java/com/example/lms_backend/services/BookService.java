package com.example.lms_backend.services;

import com.example.lms_backend.models.Book;
import com.example.lms_backend.models.SearchLogs;
import com.example.lms_backend.repositories.BookRepository;
import com.example.lms_backend.repositories.SearchLogsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;
    private final SearchLogsRepository searchLogsRepository;
    private final AuthService authService;

    public List<Book> searchBooks(SearchLogs searchLog) {
        System.out.println(searchLog);
        String query=searchLog.getSearchQuery().toLowerCase();
        List<Book> booksByTitle = bookRepository.findByTitleRegex(query);

        List<Book> booksByAuthor = bookRepository.findByAuthorRegex(query);

        List<Book> booksByGenre = bookRepository.findByGenreRegex(query);

        Set<Book> uniqueBooks = new HashSet<>();
        uniqueBooks.addAll(booksByTitle);
        uniqueBooks.addAll(booksByAuthor);
        uniqueBooks.addAll(booksByGenre);

        List<Book> searchResult = new ArrayList<>(uniqueBooks);

//        SearchLogs searchLog = new SearchLogs();
        System.out.println("User id: "+searchLog.getUserId());
        searchLog.setSearchQuery(query);
        searchLog.setDate(new Date());
        searchLog.setResultCount(searchResult.size());

        searchLogsRepository.save(searchLog);

        return searchResult;
    }

//    public List<Book> searchBooks(String query) {
//        query=query.toLowerCase();
//        List<Book> booksByTitle = bookRepository.findByTitleRegex(query);
//
//        List<Book> booksByAuthor = bookRepository.findByAuthorRegex(query);
//
//        List<Book> booksByGenre = bookRepository.findByGenreRegex(query);
//
//        Set<Book> uniqueBooks = new HashSet<>();
//        uniqueBooks.addAll(booksByTitle);
//        uniqueBooks.addAll(booksByAuthor);
//        uniqueBooks.addAll(booksByGenre);
//
//        List<Book> searchResult = new ArrayList<>(uniqueBooks);
//
//        SearchLogs searchLog = new SearchLogs();
//        searchLog.setUserId(authService.getUserId());
//        System.out.println("User id: "+searchLog.getUserId());
//        searchLog.setSearchQuery(query);
//        searchLog.setDate(new Date());
//        searchLog.setResultCount(searchResult.size());
//
//        searchLogsRepository.save(searchLog);
//
//        return searchResult;
//    }

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public long getTotalUniqueBooksCount() {
        return bookRepository.count();
    }


    public long getTotalBooksCount() {
        int countAll=0;

        List<Book> allBooks=getAllBooks();

        for (Book book:allBooks) {
            countAll+=book.getCopiesAvailable();
        }
        return countAll;
    }
}
