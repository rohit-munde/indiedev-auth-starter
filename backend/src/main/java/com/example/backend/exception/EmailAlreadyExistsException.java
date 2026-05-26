package com.example.backend.exception;

public class EmailAlreadyExistsException extends BusinessException {

    public EmailAlreadyExistsException() {
        super("This email address is already registered. If this is you, please try logging in or resetting your password.");
    }

    public EmailAlreadyExistsException(String message) {
        super(message);
    }

}
