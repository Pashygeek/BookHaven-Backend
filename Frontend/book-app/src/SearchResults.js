import React from 'react'

function SearchResults({ searchResults, handleBookClick, handleFavoriteToggle }) {
  return (
    <ul>
        {searchResults.map((book)=> (
            <li key={book.id} onClick={()=> handleBookClick(book.id)}>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <img src={book.image_url} alt={book.title} />
                <p>Category: {book.category.name}</p>
                <button onClick={()=> handleFavoriteToggle(book)}>Add To Favorites</button>
            </li>
        ))}
    </ul>
  )
}

export default SearchResults