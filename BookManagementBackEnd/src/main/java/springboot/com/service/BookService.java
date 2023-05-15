package springboot.com.service;

import java.util.List;
import java.util.Optional;

import springboot.com.entity.Book;

public interface BookService {

	public Optional<Book> addBook(Book book);

	public Optional<Book> getBookById(long id);

	public List<Book> getAllBooks();

	public Optional<Book> updateBook(Book book);

	public void deleteBook(long id);
}
