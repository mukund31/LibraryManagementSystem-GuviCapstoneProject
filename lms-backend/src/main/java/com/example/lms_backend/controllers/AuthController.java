package com.example.lms_backend.controllers;

import com.example.lms_backend.AuthResponse;
import com.example.lms_backend.config.JwtUtil;
import com.example.lms_backend.models.User;
import com.example.lms_backend.services.AuthService;
import com.example.lms_backend.services.PlatformAccessService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private final AuthService authService;
    @Autowired
    private final JwtUtil jwtUtil;

    @Autowired
    private final PlatformAccessService platformAccessService;

//    @GetMapping("/user")
//    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String authHeader) {
//        String token = authHeader.replace("Bearer ", "");
//        Map<String, Object> claims = JwtUtil.decodeJwt(token);
//        String userId = (String) claims.get("sub");  // Assumes 'sub' contains user ID.
//
//        return ResponseEntity.ok(userId);
//    }

    @PostMapping("/register")
    public String register(@RequestBody User user) {
        return authService.registerUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletRequest request) {
        try {
            if (authService.validateUser(user.getUsername(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUsername());
                String role = authService.getUserRole(user.getUsername());
                String userId = authService.getUserId(user.getUsername());

                String userAgent = request.getHeader("User-Agent");
                String deviceType = getDeviceType(userAgent);

                platformAccessService.logAccess(userId, deviceType);
                return ResponseEntity.ok(new AuthResponse(token, role, userId));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal Server Error");
        }
    }

    private String getDeviceType(String userAgent) {
        if (userAgent == null) return "Unknown";
        if (userAgent.toLowerCase().contains("mobile")) return "Mobile";
        if (userAgent.toLowerCase().contains("tablet")) return "Tablet";
        return "Desktop";
    }
}
