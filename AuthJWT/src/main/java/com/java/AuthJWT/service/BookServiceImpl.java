package com.java.AuthJWT.service;

import com.java.AuthJWT.dto.BookDto;
import com.java.AuthJWT.models.Books;
import com.java.AuthJWT.models.User;
import com.java.AuthJWT.repository.BookRepository;
import com.java.AuthJWT.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class BookServiceImpl implements BookService{

    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    @Override
    public BookDto addBook(BookDto bookDto, String email) {
        List<Books> listBook = new ArrayList<>();
        User user = userRepository.findByUsername(email);

        Books books = Books.builder()
                .name(bookDto.name())
                .author(bookDto.author())
                .publication(bookDto.datePublication())
                .price(bookDto.price())
                .build();

        listBook.add(books);
        user.setBooksSet(listBook);
        userRepository.save(user);

        return bookDto;
    }

    @Override
    public BookDto addBookToStock(BookDto bookDto) {
        Books books = Books.builder()
                .name(bookDto.name())
                .author(bookDto.author())
                .publication(bookDto.datePublication())
                .price(bookDto.price())
                .build();
        bookRepository.save(books);
        return bookDto;
    }

    @Override
    public List<Books> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public boolean deleteBook(int id) {

         bookRepository.deleteById(id);
         return true;
    }

    @Override
    public BookDto getBookById(int id) {

        Books book = bookRepository.findById(id).get();
        BookDto bookDto = BookDto.builder()
                .name(book.getName())
                .author(book.getAuthor())
                .price(book.getPrice())
                .build();

        return bookDto;
    }

    @Override
    public BookDto updateBook(BookDto bookDto, int id) {
        Books books = bookRepository.findById(id).get();

        books.setAuthor(bookDto.author());
        books.setName(bookDto.name());
        books.setPublication(bookDto.datePublication());
        books.setPrice(bookDto.price());

        bookRepository.save(books);
        return bookDto;
    }
}
