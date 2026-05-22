package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.DTO.UserLoginDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.ResponseEntity.UserResponse;
import com.example.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class UserController {

    @Autowired
    private UserService _userService;

    @PostMapping("/register")
    public User createUser(@RequestBody UserDTO user) {
        return _userService.createUser(user);
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/auth/login")
    public UserResponse login(@RequestBody UserLoginDTO userLoginDTO) {
        // Fetch the full user object from the database
        User user = _userService.getUserByEmail(userLoginDTO.getEmail());

        // Verify the password matches
        if (!passwordEncoder.matches(userLoginDTO.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
        }

        // Return the full UserResponse object
        return new UserResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.isDeleted());
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "This is dashboard";
    }
}
