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

@RestController
public class UserController {

    @Autowired
    private UserService _userService;

    @PostMapping("/register")
    public User createUser(@RequestBody UserDTO user) {
        return _userService.createUser(user);
    }

    @PostMapping("/login")
    public UserResponse login(@RequestBody UserLoginDTO userLoginDTO) {
        //go to my db and verify if user is present in the db: if yes give me that user and I'll share
        // only restricted user data which is UserDetails object to the client
        UserDetails userDetails = _userService.loadUserByUsername(userLoginDTO.getEmail());
        return  new UserResponse(userDetails.getUsername());
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "This is dashboard";
    }
}
