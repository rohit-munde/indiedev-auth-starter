package com.example.backend.Services;

import com.example.backend.Util.JwtUtil;
import io.jsonwebtoken.Jwts;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class JwtService {

    @Autowired
    private JwtUtil jwtUtil;

    public String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(jwtUtil.getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !jwtUtil.isTokenExpired(token));
    }

}
