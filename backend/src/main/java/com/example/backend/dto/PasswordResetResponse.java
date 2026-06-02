package com.example.backend.dto;

public class PasswordResetResponse {
    private String passwordResetUrl;

    public PasswordResetResponse(String passwordResetUrl) {
        this.passwordResetUrl = passwordResetUrl;
    }

    public String getPasswordResetUrl() {
        return passwordResetUrl;
    }

    public void setPasswordResetUrl(String passwordResetUrl) {
        this.passwordResetUrl = passwordResetUrl;
    }
}
