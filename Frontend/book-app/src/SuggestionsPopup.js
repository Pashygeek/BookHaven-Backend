import React from 'react'

function SuggestionsPopup({ suggestions, handleBookClick }) {
    if (suggestions.length === 0) {
        return null;
    }
  return (
    <div className='popup-container'>
        <ul>
            {suggestions.map((book)=> (
                <li key={book.id} onClick={()=> handleBookClick(book.id)}>
                    <h4>{book.title}</h4>
                    <img src={book.image_url} alt={book.title} />
                </li>
            ))}
        </ul>
    </div>
  )
}

export default SuggestionsPopup