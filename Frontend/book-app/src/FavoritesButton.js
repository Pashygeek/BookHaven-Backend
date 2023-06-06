import React from 'react'

function FavoritesButton({ book, onFavoriteToggle }) {
    const handleFavoriteToggle=()=> {
        if (book && book.id) {
        fetch(`http://localhost:9292/books/${book.id}/favorite`, {
            method: 'PUT',
        })
        .then((response)=> response.json())
        .then((data)=> {
            onFavoriteToggle(data);
        })
        .catch((error)=> {
            console.log('Error:', error);
        });
        }
    };

    if(!book || book.id) {
        return null;
    }
  return (
    <div>
        <button onClick={handleFavoriteToggle}>
            {book.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
    </div>
  )
}

export default FavoritesButton