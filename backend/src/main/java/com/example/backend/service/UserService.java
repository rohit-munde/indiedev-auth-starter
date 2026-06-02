package com.example.backend.service;

import com.example.backend.dto.ResetPasswordResponse;
import com.example.backend.dto.UserDto;
import com.example.backend.dto.UserResponseDto;
import com.example.backend.entity.User;
import com.example.backend.exception.AccountDisabledException;
import com.example.backend.exception.EmailAlreadyExistsException;
import com.example.backend.exception.InvalidTokenException;
import com.example.backend.exception.UserNotFoundException;
import com.example.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User createUser(UserDto userDto) {
        if (userRepository.findByEmail(userDto.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException();
        }

        User newUser = new User(userDto.getFullName(), userDto.getEmail(),
                passwordEncoder.encode(userDto.getPassword()));
        return userRepository.save(newUser);
    }

    public ResetPasswordResponse updatePassword(String email, String password, String token) {
        if(jwtService.isTokenExpired(token)) {
            throw new InvalidTokenException();
        }
            User user = getUserByEmail(email);
            user.setPassword(passwordEncoder.encode(password));
            User updatedUser = userRepository.save(user);
            if(updatedUser.getPassword().equals(passwordEncoder.encode(password))) {
                return new ResetPasswordResponse(user.getEmail(), false);
            }
            return new ResetPasswordResponse(user.getEmail(), true);
    }

    public User getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if(!user.isActive()) {
            throw new AccountDisabledException();
        }

        return user;
    }

    public UserResponseDto getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException(email));

        if(!user.isActive()) {
            throw new AccountDisabledException();
        }

        return new UserResponseDto(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole(),
                user.isActive());
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException(email));
    }
}
