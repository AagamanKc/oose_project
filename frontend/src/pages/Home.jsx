import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api"; // Your configured Axios instance
import LoadingIndicator from "../components/loadingindicator";
import Header from "../components/Header"; // Import Header component
import "../styles/home.css"; // Ensure you have a corresponding CSS file

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const user = JSON.parse(localStorage.getItem("userProfile")) || {}; // Fetching user profile from localStorage

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get("/movies/"); // Adjust the endpoint as needed
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filtering movies based on search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home">
      <Header /> {/* Using Header component here */}

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</h1>
          <button className="btn-primary">Get Started</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        <h2>Popular on Naaya</h2>
        {filteredMovies.length === 0 ? (
          <p>No movies found. Try different search terms.</p>
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

export default Home;
