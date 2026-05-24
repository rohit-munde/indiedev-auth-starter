package com.example.backend.ResponseEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String role = "USER"; // Default role
    private boolean isActive = true; // Default to active
    private boolean isDeleted = false; //
    private String token;


    public UserResponse(Long id, String fullName, String email, String role, boolean isActive, boolean isDeleted, String token) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
        this.token = token;
    }
}
