import React from 'react';

function BookDetails({ bookDetails, handleAddToFavorites }) {
  if (!bookDetails) {
    return null;
  }

  const { id, title, description, image_url, category } = bookDetails;
  const categoryName = category ? category.name : 'Unknown Category';

  const addToFavorites = () => {
    handleAddToFavorites(id);
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>{description}</p>
      <img className="book-image" src={image_url} alt={title} />
      <p>Category: {categoryName}</p>
      <button onClick={addToFavorites}>Add to favorites</button>
    </div>
  );
}

export default BookDetails;
