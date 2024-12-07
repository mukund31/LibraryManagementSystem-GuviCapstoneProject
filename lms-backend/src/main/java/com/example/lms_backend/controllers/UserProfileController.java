package com.example.lms_backend.controllers;

import com.example.lms_backend.models.UserProfiles;
import com.example.lms_backend.repositories.UserProfilesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-profile")
@CrossOrigin(origins = "http://localhost:4200")
public class UserProfileController {

    @Autowired
    private final UserProfilesRepository userProfilesRepository;

    @GetMapping("/{id}")
    public ResponseEntity<UserProfiles> getUserProfileById(@PathVariable String id) {
        Optional<UserProfiles> userProfile=userProfilesRepository.findById(id);
        if(userProfile.isPresent())
            return ResponseEntity.ok(userProfile.get());
        else
            return ResponseEntity.notFound().build();
    }
}
