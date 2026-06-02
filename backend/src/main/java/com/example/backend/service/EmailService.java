package com.example.backend.service;

import com.example.backend.exception.ApiError;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

@Service
public class EmailService {
    private final JavaMailSender mailSender;

    public EmailService(org.springframework.mail.javamail.JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendPasswordResetEmail(String toEmail, String resetLink) {
           SimpleMailMessage message = new SimpleMailMessage();

           message.setTo(toEmail);
           message.setSubject("IndieDev - Password Reset Request");
           message.setText("Hello,\n\n" +
                   "You requested a password reset. Please click the link below to set a new password:\n" +
                   resetLink + "\n\n" +
                   "Note: This link is valid for 15 minutes only. If you did not make this request, you can safely ignore this email.\n\n" +
                   "Regards,\n" +
                   "The IndieDev Team");

           // This triggers the SMTP delivery
           mailSender.send(message);
    }
}
