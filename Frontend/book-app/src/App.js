import React from 'react'
import BookList from './BookList'
import BookForm from './BookForm'

const App=()=> {
  return (
    <div>
      <h1>Book Haven</h1>
      <BookList />
      <BookForm />
    </div>
  )
}

export default App