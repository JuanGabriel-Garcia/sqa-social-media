package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("Should return true for a valid email")
    void testIsEmailValidWithAValidEmail() {
        assertTrue(userService.isEmailValid("test@example.com"));
    }

    @Test
    @DisplayName("Should return true for a valid password")
    void testIsPasswordValidWithAValidPassword() {
        assertTrue(userService.isPasswordValid("Password@1"));
    }
}
