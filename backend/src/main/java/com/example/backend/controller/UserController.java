package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.User;
import com.example.backend.exception.ApiError;
import com.example.backend.exception.ApiResponse;
import com.example.backend.service.EmailService;
import com.example.backend.service.UserService;
import com.example.backend.service.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final EmailService emailService;

    public UserController(AuthenticationManager authenticationManager, JwtService jwtService, UserService userService, EmailService emailService, EmailService emailService1) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userService = userService;
        this.emailService = emailService1;
    }

    @PostMapping("register")
    public ResponseEntity<ApiResponse<User>> createUser(@Valid @RequestBody UserDto user) {
        User createdUser = this.userService.createUser(user);
        return new ResponseEntity<>(new ApiResponse<>(true, "User created successfully", createdUser), HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<ApiResponse<UserResponse>> login(@Valid @RequestBody UserLoginDto userLoginDto) {
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken
                .unauthenticated(userLoginDto.getEmail(), userLoginDto.getPassword());
        authenticationManager.authenticate(authenticationRequest);

        User user = userService.getUserByEmail(userLoginDto.getEmail());

        String token = jwtService.generateToken(user.getEmail());

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.isDeleted(),
                token);

        return ResponseEntity.ok(new ApiResponse<>(true, "Login successful", userResponse));
    }

    @GetMapping("me")
    public ResponseEntity<ApiResponse<UserResponseDto>> getCurrentUser() {
        return ResponseEntity.ok(new ApiResponse<>(true, "User retrieved successfully", userService.getCurrentUser()));
    }

    @GetMapping("dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> dashboard() {
        DashboardResponse res = new DashboardResponse();
        res.setDummyStr("This is a protected dashboard endpoint. Only authenticated users can see this.");
        return ResponseEntity.ok(new ApiResponse<>(true, "Dashboard retrieved successfully", res));
    }

    @PostMapping("forgot-password")
    public ResponseEntity<ApiResponse<PasswordResetResponse>> forgotPassword(@Valid @RequestBody ForgotPasswordDto dto) {
            String passwordResetToken = jwtService.generateResetPasswordToken(dto.getEmail());
            String resetLink = "http://localhost:4200/auth/reset-password?token=" + passwordResetToken;
            emailService.sendPasswordResetEmail(dto.getEmail(), resetLink);
            return ResponseEntity.ok(new ApiResponse<PasswordResetResponse>(true, "If an account with that email exists, a password reset link has been sent.", new PasswordResetResponse(resetLink)));
    }

    @PostMapping("reset-password")
        public ResponseEntity<ApiResponse<ResetPasswordResponse>> resetPassword(@Valid @RequestBody ResetPasswordDto dto) {
        // Implementation for reset password logic
        ResetPasswordResponse response = userService.updatePassword(dto.getEmail(), dto.getNewPassword(), dto.getToken());
        return ResponseEntity.ok(new ApiResponse<ResetPasswordResponse>(true, "Password reset successful", response));
    }
}
