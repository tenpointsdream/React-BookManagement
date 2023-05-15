package springboot.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import springboot.com.entity.Book;
import springboot.com.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService {

	@Autowired
	private BookRepository bookRepository;

	@Override
	public Optional<Book> addBook(Book book) {
		return Optional.of(bookRepository.save(book));
	}

	@Override
	public Optional<Book> getBookById(long id) {
		return bookRepository.findById(id);
	}

	@Override
	public List<Book> getAllBooks() {
		return bookRepository.findAll();
	}

	@Override
	public Optional<Book> updateBook(Book book) {
		return Optional.of(bookRepository.save(book));
	}

	@Override
	public void deleteBook(long id) {
		bookRepository.deleteById(id);
	}

}
