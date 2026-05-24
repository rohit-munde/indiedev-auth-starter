package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.DTO.UserLoginDTO;
import com.example.backend.Entity.User;
import com.example.backend.ResponseEntity.UserResponse;
import com.example.backend.Services.UserService;
import com.example.backend.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class UserController {

    @Autowired
    private UserService _userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User createUser(@RequestBody UserDTO user) {
        return _userService.createUser(user);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/auth/login")
    public UserResponse login(@RequestBody UserLoginDTO userLoginDTO) {
        Authentication authenticationRequest = UsernamePasswordAuthenticationToken
                .unauthenticated(userLoginDTO.getEmail(), userLoginDTO.getPassword());
        authenticationManager.authenticate(authenticationRequest);

        User user = _userService.getUserByEmail(userLoginDTO.getEmail());

        String token = jwtUtil.generateToken(user.getEmail());

        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.isDeleted(),
                token);
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "This is dashboard";
    }
}
