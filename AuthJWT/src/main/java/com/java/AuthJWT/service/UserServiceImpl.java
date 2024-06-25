package com.java.AuthJWT.service;

import com.java.AuthJWT.config.JwtAuthenticationProvider;
import com.java.AuthJWT.dto.CredentialDto;
import com.java.AuthJWT.dto.TokenDto;
import com.java.AuthJWT.dto.UserDto;
import com.java.AuthJWT.models.Books;
import com.java.AuthJWT.models.Role;
import com.java.AuthJWT.models.User;
import com.java.AuthJWT.repository.BookRepository;
import com.java.AuthJWT.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final PasswordEncoder crypt;
    private final JwtAuthenticationProvider jwtAuthenticationProvider;

    @Override
    public TokenDto register(UserDto userDto) {


        var user = User.builder()
                            .username(userDto.username())
                            .name(userDto.name())
                            .password(crypt.encode(userDto.password()))
                            .role(Role.valueOf(userDto.role().name()))
                            .createdAt(new Date())
                            .build();

        userRepository.save(user);
        String jwt = jwtAuthenticationProvider.generateToken(userDto);

        TokenDto token = TokenDto.builder().token(jwt).build();

        return token;
    }

    @Override
    public TokenDto signIn(CredentialDto credentialDto) {

         User user = userRepository.findByUsername(credentialDto.login());

         if (user != null && crypt.matches(credentialDto.password(), user.getPassword())) {

             UserDto userDto = UserDto.builder()
                     .name(user.getName())
                     .username(user.getUsername())
                     .password(user.getPassword())
                     .role(user.getRole())
                     .build();

             TokenDto token = TokenDto.builder()
                     .token(jwtAuthenticationProvider.generateToken(userDto))
                     .build();

             return token;
         }
              else return null;

    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByUsername(email);
    }

    @Override
    public boolean addBookToUser(String email, int bookId) {
        User user = userRepository.findByUsername(email);
        Books books = bookRepository.findById(bookId).get();

        List<Books> booksSet = new ArrayList<>();
        booksSet.add(books);

        user.setBooksSet(booksSet);
        userRepository.save(user);
        return true;
    }
}
