package com.example.backend.AuthConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class AuthConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(11);
    }

    @Bean
    public SecurityFilterChain httpSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authoriseRequests -> authoriseRequests
                        .requestMatchers("/register", "/auth/login").permitAll()
                        .requestMatchers("/dashboard").authenticated())
                .formLogin(formLogin -> formLogin
                        .defaultSuccessUrl("/dashboard", true)
                        .permitAll());

        return httpSecurity.build();
    }
}
