package com.example.backend.Repository;

import com.example.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // define query methods if needed, e.g. Optional<User> findByEmail(String email);
    Optional<User> findByEmail(String email);
}
