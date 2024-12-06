package com.example.lms_backend.controllers;


import com.example.lms_backend.models.BorrowingHistory;
import com.example.lms_backend.services.BorrowingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class BorrowingHistoryController {

    @Autowired
    private BorrowingHistoryService borrowingHistoryService;

    @PostMapping("/add-borrowing-history")
    public BorrowingHistory createBorrowingHistory(@RequestBody BorrowingHistory borrowingHistory) {
//        System.out.println("Cont: " +borrowingHistory);
        return borrowingHistoryService.saveBorrowingHistory(borrowingHistory);
    }
}
