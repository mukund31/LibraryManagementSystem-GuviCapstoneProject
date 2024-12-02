package com.example.lms_backend.repositories;

import com.example.lms_backend.models.SearchLogs;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchLogsRepository extends MongoRepository<SearchLogs, String> {

}
