package com.java.AuthJWT.service;

import com.java.AuthJWT.dto.BookDto;
import com.java.AuthJWT.models.Books;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookService {

    BookDto addBook(BookDto bookDto, String email);
    BookDto addBookToStock(BookDto bookDto);
    List<Books> getAllBooks();

    boolean deleteBook(int id);

    BookDto getBookById(int id);

}
