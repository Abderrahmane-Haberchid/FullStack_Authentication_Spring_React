package com.java.AuthJWT.api;

import com.java.AuthJWT.dto.BookDto;
import com.java.AuthJWT.dto.CredentialDto;
import com.java.AuthJWT.dto.TokenDto;
import com.java.AuthJWT.dto.UserDto;
import com.java.AuthJWT.models.Books;
import com.java.AuthJWT.models.User;
import com.java.AuthJWT.service.BookService;
import com.java.AuthJWT.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final BookService bookService;

    @PostMapping("register")
    public ResponseEntity<TokenDto> register(@RequestBody UserDto userDto){
        TokenDto tokenDto = userService.register(userDto);
        if (tokenDto == null)
            return new ResponseEntity<TokenDto>(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity<TokenDto>(tokenDto, HttpStatus.CREATED);
    }

    @PostMapping("login")
    public ResponseEntity<TokenDto> login(@RequestBody CredentialDto credentialDto){
        TokenDto tokenDto = userService.signIn(credentialDto);
        if (tokenDto == null)
            return new ResponseEntity<TokenDto>(HttpStatus.NOT_FOUND);
        else
            return ResponseEntity.ok(tokenDto);
    }

    @GetMapping("user/{email}")
    public ResponseEntity<User> getOneUser(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PutMapping("addBookToUser/{email}/{bookId}")
    public ResponseEntity<Boolean> addBook(@PathVariable String email, @PathVariable int bookId){

        System.out.println("====================EndPoint chekcked ============="+email+"====="+bookId);
        return ResponseEntity.ok(userService.addBookToUser(email, bookId));
    }

    @PostMapping("addBookToStock")
    public ResponseEntity<BookDto> addBookToDb(@RequestBody BookDto bookDto){
        BookDto bookDto1 = bookService.addBookToStock(bookDto);
        if (bookDto1 == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        else
            return ResponseEntity.ok(bookDto1);
    }
    @GetMapping("/all")
    public ResponseEntity<List<Books>> fetchAllBooks(){
        return ResponseEntity.ok(bookService.getAllBooks());
    }
}
