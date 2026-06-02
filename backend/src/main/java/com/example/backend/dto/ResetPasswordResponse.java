package com.example.backend.dto;

public class ResetPasswordResponse {
    private String email;
    private boolean isPasswordReset;

    public ResetPasswordResponse(String email, boolean isPasswordReset) {
        this.email = email;
        this.isPasswordReset = isPasswordReset;
    }

    public String getEmail() {
        return email;
    }

    public boolean isPasswordReset() {
        return isPasswordReset;
    }
}
