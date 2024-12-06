package com.example.lms_backend.repositories;

import com.example.lms_backend.models.Penalties;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PenaltyRepository extends MongoRepository<Penalties, String> {
}
