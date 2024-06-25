package com.java.AuthJWT.repository;

import com.java.AuthJWT.dto.UserDto;
import com.java.AuthJWT.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsername(String email);
}
