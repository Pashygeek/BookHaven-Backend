import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './popupsearch.css'
import './App.css'

import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import SuggestionsPopup from './SuggestionsPopup';
import BookDetails from './BookDetails';
import FavoritesButton from './FavoritesButton';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:9292/books?searchQuery=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
      setSuggestions([]);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      fetch(`http://localhost:9292/books/suggestions?searchQuery=${query}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBookId(book);
  };

  const handleFavoriteToggle = (updatedBook) => {
    const isBookInFavorites = favorites.some((book) => book.id === updatedBook.id);

    let updatedFavorites;
    if (isBookInFavorites) {
      updatedFavorites = favorites.filter((book) => book.id !== updatedBook.id);
    } else {
      updatedFavorites = [...favorites, updatedBook];
    }
    setFavorites(updatedFavorites);
  };

  useEffect(() => {
    if (selectedBookId) {
      const fetchBookDetails = async () => {
        try {
          const response = await fetch(`http://localhost:9292/books/${selectedBookId}`);
          const data = await response.json();
          setBookDetails(data);
        } catch (error) {
          console.log("Error:", error);
        }
      };

      fetchBookDetails();
    }
  }, [selectedBookId]);

  return (
    <div className='home-container'>
      <SearchBar
        searchQuery={searchQuery}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      <SearchResults
        searchResults={searchResults}
        handleBookClick={handleBookClick}
        handleFavoriteToggle={handleFavoriteToggle}
      />
      <SuggestionsPopup
        suggestions={suggestions}
        handleBookClick={handleBookClick}
      />
      <BookDetails bookDetails={bookDetails} />
      <FavoritesButton
      book={bookDetails}
      onFavoriteToggle={()=> handleFavoriteToggle(bookDetails)}
      />
    </div>
  );
}

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9292/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.name}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoryBooks() {
  const { name } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:9292/categories/${name}`)
      .then((response) => response.json())
      .then((data) => {
        setCategory(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [name]);

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{category.name}</h2>
      <ul>
        {category.books.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img className='book-image' src={book.image_url} alt={book.title} />
            <p>Category: {book.category.name}</p>
            <FavoritesButton
              book={book}
              onFavoriteToggle={() => {}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const handleFavoriteToggle = (updatedBook)=> {
    const isBookInFavorites = favorites.some((book)=> book.id === updatedBook);

    let updatedFavorites;
    if(isBookInFavorites) {
    updatedFavorites = favorites.filter((book)=> book.id !== updatedBook.id);
  } else {
    updatedFavorites = [...favorites, updatedFavorites];
  }
  setFavorites(updatedFavorites);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
}


  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img className='book-image' src={book.image_url} alt={book.title} />
            <p>Category: {book.category.name}</p>
            <FavoritesButton
              book={book}
              onFavoriteToggle={()=> handleFavoriteToggle(book)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  
  return (
    <Router>
      <div>
        <nav className='nav'>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/categories">Categories</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route path="/categories/:name" component={CategoryBooks} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
