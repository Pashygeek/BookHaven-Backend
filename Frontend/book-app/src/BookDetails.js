import React from 'react'

function BookDetails({ bookDetails }) {
    if (!bookDetails) {
        return null;
    }
  return (
    <div>
        <h2>{bookDetails.title}</h2>
        <p>{bookDetails.description}</p>
        <img src={bookDetails.image_url} alt={bookDetails.title} />
    </div>
  )
}

export default BookDetails