// Favorites.js
import React, { useEffect, useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
   fetchFavorites();
  }, []);

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

  return (
    <div>
      <h2>Favorites</h2>
      <ul>
        {favorites.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img className="book-image" src={book.image_url} alt={book.title} />
            <p>Category: {book.category.name}</p>
            <button onClick={() => (favorites.some((favBook)=> favBook.id === book.id)
                ? removeFromFavorites(book)
                : addToFavorites(book)
            )}>
            {favorites.some((favBook)=> favBook.id === book.id)
            ? "Remove from Favorites"
            : "Add to Favorites"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
