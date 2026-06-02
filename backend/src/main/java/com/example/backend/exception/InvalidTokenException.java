package com.example.backend.exception;

import org.springframework.http.HttpStatus;

public class InvalidTokenException extends BusinessException {
    public InvalidTokenException() {
        super("Invalid token provided", HttpStatus.BAD_REQUEST);
    }
}
