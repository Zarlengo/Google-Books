import React, { useEffect, useContext } from 'react';
import Navbar from '../components/navbar';
import Hero from '../components/hero';
import Search from '../components/search';
import Book from '../components/book';
import BookContext from '../utils/BookContext';
import './search.css';

export default function SearchPage() {
    const [books, setBooks] = useContext(BookContext);

    useEffect(() => {
        setBooks([]);
    }, [setBooks])
    
    return (
        <>
            <Navbar />
            <Hero />
            <Search/>
            <div className="resultDiv">
                <h2>Results</h2>
                { books.map((book) => <Book
                        key={ 'bookId' + book.bookId }
                        book={book}
                        setBooks={setBooks}
                        mode='Search'
                    />
                )}
            </div>
            
        </>
    );
}
