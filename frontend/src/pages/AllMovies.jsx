import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // Assuming you have a configured Axios instance

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Fetch movies and categories from the API
    const fetchMovies = async () => {
      try {
        const movieResponse = await api.get("/movies/"); // Adjust the endpoint as needed
        setMovies(movieResponse.data);
        setFilteredMovies(movieResponse.data); // Initially show all movies
      } catch (err) {
        console.error("Error fetching movies:", err);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryResponse = await api.get("/categories/"); // Fetch categories
        setCategories(categoryResponse.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchMovies();
    fetchCategories();
  }, []);

  // Filter movies based on selected category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredMovies(movies);
    } else {
      setFilteredMovies(movies.filter((movie) => movie.genre === category));
    }
  };

  return (
    <div className="all-movies">
      <h1>All Movies</h1>

      {/* Category Filter */}
      <div className="category-filter">
        <label htmlFor="category">Filter by Category: </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {filteredMovies.length === 0 ? (
          <p>No movies found for this category.</p>
        ) : (
          <div className="grid-container">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img src={movie.image} alt={movie.title} />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.genre}</p>
                  <Link to={`/movie/${movie.id}`} className="movie-link">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMovies;
