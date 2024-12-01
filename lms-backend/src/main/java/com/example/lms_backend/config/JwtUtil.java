package com.example.lms_backend.config;

import com.example.lms_backend.models.User;
import com.example.lms_backend.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class JwtUtil {

    private final String SECRET_KEY = "30cf8e906ff43acaa9fd01cd4cef20a382ba5114a4b54dfe4b7ade7d7eebee2be0b7dfac17522123077f7698316b45245e7781e704ffb4192c5ef926665c43b236a95fb9f554078f19cc34924212955c09df46229ce3dc880c71e2cd8ff1f0b28ea3d336d3a424f2564158b30cb2a7778e1aacc91c08f71f16ee6f74b0c81c4888cdb040bdf97ca3d6dab6c4a020e9b3c397ac0e6c604df1e8ae2ca6abc9ee872da3af6dfe2827de6b8df764f32f1dfae43eadc8869514044de8cc545026bfdf160a7bab3e0f26010afb9fede3165f6987c00561d31a99fa2e69e29e02d7ce634b2efe09d229de7a7315f1426f4958b7c0e4df572632767767b009afb2e810b7";
    private final UserRepository userRepository;
//    public String generateToken(String username) {
//        return Jwts.builder()
//                .setSubject(username)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }

    public String generateToken(String username) {
        User user = userRepository.findByUsername(username).orElseThrow();

        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", user.getId());
        claims.put("role", user.getRole());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }


    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, String username) {
        return extractUsername(token).equals(username);
    }
}
