package com.example.backend.DTO;

public record UserResponseDto(
        Long id,
        String name,
        String email,
        String role,
        Boolean isActive
) {
}