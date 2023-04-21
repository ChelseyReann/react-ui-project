import React, { useEffect, useState } from "react";
import './App.css'

const HamburgerMenu = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track whether menu is open or closed

  useEffect(() => {
    // Fetch data from the API
    fetch("https://nytimes-book-api.herokuapp.com/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data); // Update state with book data
      })
      .catch((error) => {
        console.error("Failed to fetch book data:", error);
      });
  }, []);

  const handleBookClick = (book) => {
    // Update selected book state with the correct image URL
    setSelectedBook(book);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu open/closed state
  };

  return (
    <div>
      {/* Hamburger menu */}
      <div className="menu-icon" onClick={handleMenuToggle}>
        ☰
      </div>
      <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
        {isMenuOpen && ( // Render book titles only when menu is open
          <div className="book-container">
            {/* Render book titles */}
            {books.map((book, index) => (
              <p key={index} className="book-title" onClick={() => handleBookClick(book)}>
                {book.title}
              </p>))}
          </div>)}
      </div>
      {/* Render selected book information */}
      {selectedBook && (
        <div className="selected-book">
          <img src={selectedBook.book_image} alt={selectedBook.title} />
          <h3>{selectedBook.title}</h3>
          <p>Author: {selectedBook.author}</p>
          <p>Description: {selectedBook.description}</p>
          <p>Rank in Best Seller List: {selectedBook.rank}</p>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;