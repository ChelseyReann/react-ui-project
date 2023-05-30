import { useEffect, useState } from "react";
import './App.css'

function HamburgerMenu () {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  // State to track whether menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

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
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    // Toggle menu open/closed state
    setIsMenuOpen(!isMenuOpen); 
  };

  return (
    <div className="hamburger-menu-container">
      {/* Hamburger menu */}
      <div className="hamburger-book-container">
      <div className="menu-icon" onClick={handleMenuToggle}>
        ☰
      </div>
      <div className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}>
        {isMenuOpen && ( // Display book titles only when menu is open
          <div className="book-container">
            {/* Display book titles */}
            {books.map((book, index) => (
              <p key={index} className="book-title" onClick={() => handleBookClick(book)}>
                {book.title}
              </p>
              ))}
          </div>
          )}
      </div>
      {/* Display selected book information */}
      {selectedBook && (
        <div className="selected-book">
          <img className="bookimg" src={selectedBook.book_image} alt={selectedBook.title} />
          <h3>{selectedBook.title}</h3>
          <p>Author: {selectedBook.author}</p>
          <p className="book-description">Description: {selectedBook.description}</p>
          <p>Rank in Best Seller List: {selectedBook.rank}</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default HamburgerMenu;