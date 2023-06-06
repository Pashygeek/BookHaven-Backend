import React, { useState } from 'react'

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <div>
      <input
      type='text'
      value={searchQuery}
      onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search for Book</button>
      <ul>
        {searchResults.map((book)=>(
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img src={book.image_url} alt={book.title} />
            <p>Category: {book.category.name}</p>
            </li>
        ))}
      </ul>
      {suggestions.length > 0 && (
        <div className='popup-container'>
          <h3>Book Suggestions:</h3>
          <ul>
            {suggestions.map((book)=> (
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

export default App