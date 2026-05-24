package com.example.backend.AuthConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.backend.Filter.JwtAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationProvider;

@Configuration
public class AuthConfig {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter JwtAuthenticationFilter;

    public AuthConfig(AuthenticationProvider authenticationProvider, JwtAuthenticationFilter JwtAuthenticationFilter) {
        this.authenticationProvider = authenticationProvider;
        this.JwtAuthenticationFilter = JwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain httpSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authoriseRequests -> authoriseRequests
                        .requestMatchers("/register", "/auth/login").permitAll()
                        .anyRequest().authenticated())
        // Configure Stateless Session Management
                .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Connect the Authentication Provider
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(JwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}
