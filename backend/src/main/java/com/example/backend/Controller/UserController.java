package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.DTO.UserLoginDTO;
import com.example.backend.DTO.UserResponseDto;
import com.example.backend.Entity.User;
import com.example.backend.ResponseEntity.UserResponse;
import com.example.backend.Services.UserService;
import com.example.backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    public UserService userService;

    public UserController(UserService _userService) {
        this.userService = _userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> createUser(@RequestBody UserDTO user) {
        User createdUser = this.userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<UserResponse> login(@RequestBody UserLoginDTO userLoginDTO) {
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken
                .unauthenticated(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        authenticationManager.authenticate(authenticationRequest);

        User user = userService.getUserByEmail(userLoginDTO.getEmail());

        String token = jwtUtil.generateToken(user.getEmail());

        UserResponse userResponse = new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.isDeleted(),
                token);

        return ResponseEntity.ok(userResponse);
    }

    @GetMapping("/users/me")
    public ResponseEntity<UserResponseDto> getCurrentUser() {
        return ResponseEntity.ok(userService.getCurrentUser());
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "This is dashboard";
    }
}
