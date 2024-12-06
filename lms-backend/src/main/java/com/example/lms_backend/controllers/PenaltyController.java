package com.example.lms_backend.controllers;

import com.example.lms_backend.models.Penalties;
import com.example.lms_backend.services.PenaltyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class PenaltyController {

    @Autowired
    private PenaltyService penaltyService;

    @PostMapping("/pay-penalty")
    public Penalties addPenaltyRecord(@RequestBody Penalties penalties) {
        return penaltyService.savePenaltyRecord(penalties);
    }
}
