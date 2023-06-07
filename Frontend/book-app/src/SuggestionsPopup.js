import React, { useEffect, useState } from 'react';
import BookDetails from './BookDetails';

function SuggestionsPopup({ suggestions, handleBookClick }) {
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [favoriteBooks, setFavoriteBooks] = useState([]);

  const handleBookSelection = async (bookId) => {
    const response = await fetchBookDetails(bookId);
    handleBookClick({ bookId, category: response.category.name });
    setSelectedBookId(bookId);
  };

  const handleAddToFavorites = (bookId) => {
    const bookToAdd = suggestions.find((book) => book.id === bookId);
    setFavoriteBooks((prevBooks) => [...prevBooks, bookToAdd]);
  };

  const fetchBookDetails = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:9292/books/${bookId}`);
      if (response.ok) {
        const data = await response.json();
        const categoryResponse = await fetch(`http://localhost:9292/categories/${data.category.name}`);
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          return { ...data, category: categoryData };
        } else {
          throw new Error('Failed to fetch category details');
        }
      } else {
        throw new Error('Failed to fetch book details');
      }
    } catch (error) {
      console.error(error);
      // Handle error case
    }
  };

  useEffect(() => {
    setSelectedBookId(null);
    setFavoriteBooks([]);
  }, [suggestions]);

  if (suggestions.length === 0) {
    return null;
  }

  if (selectedBookId) {
    const selectedBook = suggestions.find((book) => book.id === selectedBookId);
    return <BookDetails bookDetails={selectedBook} handleAddToFavorites={handleAddToFavorites} />;
  }

  return (
    <div className="popup-container">
      <ul>
        {suggestions.map((book) => (
          <li key={book.id} onClick={() => handleBookSelection(book.id)}>
            <h4>{book.title}</h4>
            <img src={book.image_url} alt={book.title} />
          </li>
        ))}
      </ul>
      {favoriteBooks.length > 0 && (
        <div className="favorites-container">
          <h3>Favorites</h3>
          <ul>
            {favoriteBooks.map((book) => (
              <li key={book.id}>
                <h4>{book.title}</h4>
                <img src={book.image_url} alt={book.title} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SuggestionsPopup;
