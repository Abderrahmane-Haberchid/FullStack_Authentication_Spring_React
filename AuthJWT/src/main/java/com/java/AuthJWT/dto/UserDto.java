package com.java.AuthJWT.dto;

import com.java.AuthJWT.models.Role;
import lombok.*;

@Builder
public record UserDto(String name, String username, String password, Role role, String createdAt) {
}
