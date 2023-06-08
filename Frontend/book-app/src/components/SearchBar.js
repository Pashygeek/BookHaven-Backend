import React from 'react'
import { Input, Button } from '@chakra-ui/react'

function SearchBar({ searchQuery, handleInputChange, handleSearch}) {
  return (
    <div>
        <Input
        type='text'
        value={searchQuery}
        onChange={handleInputChange}
        />
        <Button onClick={handleSearch}>Search For Book</Button>
    </div>
  )
}

export default SearchBar