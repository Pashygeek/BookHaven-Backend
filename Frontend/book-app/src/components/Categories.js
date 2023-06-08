import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import {Box, Heading, Text, Image,Vstack}
import FavoritesButton from "./Favorites";

function Categories() {
  const { name } = useParams();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [category, setCategory] = useState();

  useEffect(() => {
    fetch("http://localhost:9292/categories")
      .then((response) => response.json())
      .then((data) => {
 
        setCategories(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (categoryName) {
      fetch(`http://localhost:9292/categories/${categoryName}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCategory(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
    }
  }, [categoryName])

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => setCategoryName(category.name)}>
            <Link to={`/categories/${category.name}`}>{category.name}</Link>
          </li>
        ))}
      </ul>

      <h2>{category?.name}</h2>
      <ul>
        {category?.books?.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <img className="book-image" src={book.image_url} alt={book.title} />
            <FavoritesButton book={book} onFavoriteToggle={() => {}} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
