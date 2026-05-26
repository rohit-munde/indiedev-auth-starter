package com.example.backend.Services;

import com.example.backend.DTO.UserDTO;
import com.example.backend.DTO.UserResponseDto;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository _userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(UserDTO userDTO) {
        User newUser = new User(userDTO.getFullName(), userDTO.getEmail(), passwordEncoder.encode(userDTO.getPassword()));
        return _userRepository.save(newUser);
    }

    public User getUserByEmail(String email) {
        return _userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

        public UserResponseDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = _userRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));

        return new UserResponseDto(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getRole(),
            user.isActive()
        );
        }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = _userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles("USER") // You can customize roles as needed
                .build();
    }
}
