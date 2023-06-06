import React from 'react'
import { useState } from 'react'

const BookForm=()=> {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit=(event)=> {
        event.preventDefault();
        const bookData = {
            title: title,
            author: author,
            description: description,
            category_id: 1,
        };

        fetch("http://localhost:9292/books", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        })
        .then((response)=> response.json())
        .them((data)=> {
            console.log('New book created:', data);
            //Reset the form fields
            setTitle('');
            setAuthor('');
            setDescription('');
        });
    };

  return (
    <div>
        <h2>Add New Book</h2>
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
            type='text'
            value={title}
            onChange={(event)=> setTitle(event.target.value)}
            />

            <label>Author:</label>
            <input
            type='text'
            value={author}
            onChange={(event)=> setAuthor(event.target.value)}
            />

            <label>Description:</label>
            <textarea
            value={description}
            onChange={(event)=> setDescription(event.target.value)}
            ></textarea>

            <button type='submit'>Add Book</button>
        </form>
    </div>
  )
}

export default BookForm