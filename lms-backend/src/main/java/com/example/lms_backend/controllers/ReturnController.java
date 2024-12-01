package com.example.lms_backend.controllers;

import com.example.lms_backend.models.Return;
import com.example.lms_backend.services.ReturnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:4200")
public class ReturnController {

    @Autowired
    private ReturnService returnService;

    @PostMapping("/add-return-record")
    public Return createReturn(@RequestBody Return returnRecord) {
        return returnService.saveReturn(returnRecord);
    }
}
