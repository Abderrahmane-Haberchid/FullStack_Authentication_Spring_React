package com.java.AuthJWT.service;

import com.java.AuthJWT.dto.CredentialDto;
import com.java.AuthJWT.dto.TokenDto;
import com.java.AuthJWT.dto.UserDto;
import com.java.AuthJWT.models.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    TokenDto register(UserDto userDto);
    TokenDto signIn(CredentialDto credentialDto);

    User getUserByEmail(String email);

    boolean addBookToUser(String email, int bookId);

    boolean deleteMyBook(String email, int id);
}
