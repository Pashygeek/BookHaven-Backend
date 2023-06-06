import React from 'react'

function SearchBar({ searchQuery, handleInputChange, handleSearch}) {
  return (
    <div>
        <input
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search For Book</button>
    </div>
  )
}

export default SearchBar