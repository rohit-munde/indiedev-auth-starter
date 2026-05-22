package com.example.backend.ResponseEntity;

public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String role = "USER"; // Default role
    private boolean isActive = true; // Default to active
    private boolean isDeleted = false; //

    public UserResponse() {}

    public UserResponse(String email) {
        this.email = email;
    }

    public UserResponse(Long id, String fullName, String email, String role, boolean isActive, boolean isDeleted) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.isActive = isActive;
        this.isDeleted = isDeleted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
