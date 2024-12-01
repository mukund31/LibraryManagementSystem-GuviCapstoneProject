package com.example.lms_backend.repositories;

import com.example.lms_backend.models.Return;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReturnRepository extends MongoRepository<Return, String> {


}
