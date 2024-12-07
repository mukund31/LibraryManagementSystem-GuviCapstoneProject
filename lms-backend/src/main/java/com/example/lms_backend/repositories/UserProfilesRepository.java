package com.example.lms_backend.repositories;

import com.example.lms_backend.models.UserProfiles;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProfilesRepository extends MongoRepository<UserProfiles, String> {


}
