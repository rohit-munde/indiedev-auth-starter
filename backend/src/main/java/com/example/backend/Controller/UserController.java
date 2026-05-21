package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import com.example.backend.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/dashboard")
    public String dashboard() {
        return "This is dashboard";
    }
}
