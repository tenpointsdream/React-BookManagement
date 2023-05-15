import './Book.css'
import { useEffect, useState } from "react";
import Form from './Form';

function Book() {
    const [books, setBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [currentbook, setCurrentBook] = useState(null);
    const baseUrl = 'http://localhost:8080/api';
    const hideForm = () => setShowForm(false);
    const handleEditBook = (book) => {
        setShowForm(true);
        setCurrentBook(book);
        console.log(currentbook);
    }
    const fetchBooks = async () => {
        await fetch(`${baseUrl}/getallbooks`)
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setBooks(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );
    };

    const createBook = async (bookData) => {
        try {
            const response = await fetch(`${baseUrl}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });
            const data = await response.json();
            console.log(data);
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
        fetchBooks();
    }

    const updateBook = async (id, bookData) => {
        try {
            const response = await fetch(`${baseUrl}/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });
            const updatedBook = await response.json();
            console.log(updatedBook);
            setBooks((previousbooks) =>
                previousbooks.map((book) => (book.id === id ? updatedBook : book)));
            setShowForm(false);
        } catch (error) {
            console.error(error);
        }
    }

    const deleteBook = async (id) => {
        try {
            if (window.confirm('Do you want to delete this book?')) {
                await fetch(`${baseUrl}/delete/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log("Book deleted");
            }
        } catch (error) {
            console.error(error);
        }
        fetchBooks();
    }

    const handleSubmit = (formData) => {
        if (currentbook) {
            updateBook(currentbook.id, formData);
        } else {
            createBook(formData);
        }
        setCurrentBook(null);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='container'>
                <div>
                    <h2>Book Management System</h2>
                </div>

                <div className='table-container'>
                    <table>
                        <thead>
                            <tr>
                                <div className='addnew'>
                                    <button className='btn create' currentbook={null} onClick={() => handleEditBook(null)}>Add New Book</button>
                                </div>
                            </tr>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Issue Date</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>${book.price}</td>
                                    <td>{book.issueDate}</td>
                                    <td>
                                        <button className='btn update' onClick={() => handleEditBook(book)}>Update</button>
                                        <button className='btn delete' onClick={() => deleteBook(book.id)}>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showForm ?
                    <div className='form-div'>
                        <Form currentbook={currentbook} onSubmit={handleSubmit} />
                        <button className='btn hide' onClick={hideForm}>Hide</button>
                    </div>
                    : null}

            </div>
        );
    }
}

export default Book;