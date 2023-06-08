// Home.js
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import SuggestionsPopup from "./SuggestionsPopup";
import BookDetails from "./BookDetails";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [bookDetails, setBookDetails] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(()=> {
    fetchFavorites();
  })

  const fetchFavorites=()=> {
    fetch("http://localhost:9292/favorites")
    .then((response)=> response.json())
    .then((data)=> {
      setFavorites(data);
    })
    .catch((error)=> {
      console.log("Error:", error);
    });
  };

  const addToFavorites =(book)=> {
    fetch(`http://localhost:9292/books/${book.id}/favorite`, {
      method: "PUT",
    })
    .then((response)=> response.json())
    .then((data)=> {
      setFavorites([...favorites, data]);
    })
    .catch((error)=> {
      console.log("Error:", error);
    });
  };

  const removeFromFavorites = (book)=> {
    fetch(`http://localhost:9292/books/${book.id}/unfavorite`, {
      method: "PUT",
    })
    .then((response)=> response.json())
    .then(()=> {
      const updatedFavorites = favorites.filter((favBook)=> favBook.id !== book.id);
      setFavorites(updatedFavorites);
    })
    .catch((error)=> {
      console.log("Error:", error);
    });
  };


  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:9292/books?searchQuery=${searchQuery}`
      );
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
    setSelectedBookId(book.id);
  };

  const handleFavoriteToggle = (updatedBook) => {
    const isBookInFavorites = favorites.some(
      (book) => book.id === updatedBook.id
    );

    if (isBookInFavorites) {
      removeFromFavorites(updatedBook);
    } else {
      addToFavorites(updatedBook);
    }
  };

  useEffect(() => {
    if (selectedBookId) {
      const fetchBookDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:9292/books/${selectedBookId}`
          );
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
     <div className="home-container">
      <div className="content-wrapper">
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
        {bookDetails && (
          <div>
            <BookDetails bookDetails={bookDetails} />
            <button onClick={() => handleFavoriteToggle(bookDetails)}>
              {favorites.some((favBook) => favBook.id === bookDetails.id)
                ? "Remove from Favorites"
                : "Add to Favorites"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
