package springboot.com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import springboot.com.entity.Book;
import springboot.com.service.BookService;

@SpringBootApplication
public class BookManagementBackEndApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(BookManagementBackEndApplication.class, args);
		
		BookService bookService = ctx.getBean(BookService.class);
		
		bookService.addBook(new Book(1, "Java JumpStart", "No name", "01-01-2001", 10.98));
		bookService.addBook(new Book(2, "JavaScript JumpStart", "No name1", "02-02-2002", 11.98));
		bookService.addBook(new Book(3, "ReactJS JumpStart", "No name2", "03-03-2003", 12.98));
	}

}
