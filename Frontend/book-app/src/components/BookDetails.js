import React from 'react';

function BookDetails({ bookDetails, handleAddToFavorites }) {
  if (!bookDetails) {
    return null;
  }

  const { id, title, description, image_url, name } = bookDetails;

  const addToFavorites = () => {
    handleAddToFavorites(id);
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img className="book-image" src={image_url} alt={title} />
      <p>Category: {name}</p>
      <button onClick={addToFavorites}>Add to favorites</button>
    </div>
  );
}

export default BookDetails;
