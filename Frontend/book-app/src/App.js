import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import './popupsearch.css'
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SuggestionsPopup from './SuggestionsPopup';
import BookDetails from './BookDetails';
import FavoritesButton from './FavoritesButton';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async ()=> {
    try {
      const response = await fetch(`http://localhost:9292/books?searchQuery=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
      setSuggestions([]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleInputChange =(e)=> {
    const query = e.target.value;
    setSearchQuery(query);
    if(query.length > 0) {
      fetch(`http://localhost:9292/books/suggestions?searchQuery=${query}`)
      .then((response)=> response.json())
      .then((data)=> {
        setSuggestions(data);
      })
      .catch((error)=> {
        console.log("Error:", error);
      });
    } else {
      setSuggestions([]);
    }
  };

  const handleBookClick=(bookId)=> {
    setSelectedBookId(bookId);
  };

  const handleFavoriteToggle = (updatedBook)=> {
    const isBookInFavorites = favorites.some((book)=> book.id === updatedBook.id);

    let updatedFavorites;
    if (isBookInFavorites) {
      updatedFavorites = favorites.filter((book)=> book.id !== updatedBook.id);
    } else {
      updatedFavorites = [...favorites, updatedBook];

      setFavorites(updatedFavorites);
    }
  }

  useEffect(()=> {
    if(selectedBookId) {
      const fetchBookDetails = async()=> {
        try {
          const response = await fetch(`http://localhost:9292/books/${selectedBookId}`);
          const data = await response.json();
          setBookDetails(data);
        } catch(error) {
          console.log("Error:", error);
        }
      };

      fetchBookDetails();
    }
  }, [selectedBookId]);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    <div>
      <SearchBar
      searchQuery={searchQuery}
      handleInputChange={handleInputChange}
      handleSearch={handleSearch} 
      />
      <SearchResults
      searchResults={searchResults}
      handleBookClick={handleBookClick}
      />
      <SuggestionsPopup
      suggestions={suggestions}
      handleBookClick={handleBookClick}
      />
      <BookDetails bookDetails={bookDetails} />
      {selectedBookId && (
        <FavoritesButton
        book={searchResults.find((book)=> book.id === selectedBookId)}
        onFavoriteToggle={handleFavoriteToggle}
        />
      )}
    </div>
  );
}

export default App