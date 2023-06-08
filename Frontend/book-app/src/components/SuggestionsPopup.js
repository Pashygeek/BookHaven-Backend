import React, { useEffect, useState } from 'react';
import BookDetails from './BookDetails';
import { Box, Flex, ListItem, UnorderedList, Text, Image } from '@chakra-ui/react';

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
    <Box className="popup-container">
      <UnorderedList>
        {suggestions.map((book) => (
          <ListItem key={book.id} onClick={() => handleBookSelection(book.id)}>
            <Text as="h4">{book.title}</Text>
            <Image src={book.image_url} alt={book.title} />
          </ListItem>
        ))}
      </UnorderedList>
      {favoriteBooks.length > 0 && (
        <Box className="favorites-container">
          <Text as="h4">Favorites</Text>
          <UnorderedList>
            {favoriteBooks.map((book) => (
              <ListItem key={book.id}>
                <Text as="h4">{book.title}</Text>
                <Image src={book.image_url} alt={book.title} />
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      )}
    </Box>
  );
}

export default SuggestionsPopup;
