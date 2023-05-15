package springboot.com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import springboot.com.entity.Book;
import springboot.com.service.BookService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000/")
public class BookController {

	@Autowired
	private BookService bookService;

	@PostMapping("/add")
	public ResponseEntity<Optional<Book>> addBook(@RequestBody Book book) {
		Optional<Book> addedBook = bookService.addBook(book);
		return new ResponseEntity<>(addedBook, HttpStatus.CREATED);
	}

	@GetMapping("/getbyid/{id}")
	public ResponseEntity<Optional<Book>> getBookById(@PathVariable("id") long id) {
		Optional<Book> book = bookService.getBookById(id);
		return new ResponseEntity<>(book, HttpStatus.OK);
	}

	@GetMapping("/getallbooks")
	public ResponseEntity<List<Book>> getAllBooks() {
		List<Book> books = bookService.getAllBooks();
		return new ResponseEntity<>(books, HttpStatus.OK);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Optional<Book>> updateBook(@PathVariable("id") long id, @RequestBody Book book) {
		Optional<Book> optionalBook = bookService.getBookById(id);
		if (optionalBook.isPresent()) {
			book.setId(id);
			Optional<Book> updatedBook = bookService.updateBook(book);
			return new ResponseEntity<>(updatedBook, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteBook(@PathVariable("id") long id) {
		Optional<Book> optionalBook = bookService.getBookById(id);
		if (optionalBook.isPresent()) {
			bookService.deleteBook(id);
			return new ResponseEntity<>("Book deleted!", HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}
