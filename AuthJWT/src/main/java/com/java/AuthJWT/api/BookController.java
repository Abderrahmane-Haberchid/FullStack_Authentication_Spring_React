package com.java.AuthJWT.api;

import com.java.AuthJWT.dto.BookDto;
import com.java.AuthJWT.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/book/")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    private final BookService bookService;

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteBook(@PathVariable int id){
        return ResponseEntity.ok(bookService.deleteBook(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDto> getOneBook(@PathVariable int id){
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @PostMapping("/update/{id}")
    public ResponseEntity<BookDto> updateById(@RequestBody BookDto bookDto, @PathVariable int id){

        return ResponseEntity.ok(bookService.updateBook(bookDto, id));
    }
}
