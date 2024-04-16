import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Search.css";
import SearchResult from "./SearchResult";

const Search = () => {
  const apiUrl = import.meta.env.VITE_API_HOST;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${apiUrl}/try`, {
        params: { q: searchQuery },
      });
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const suggest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${apiUrl}/search`, {
        params: { q: searchQuery },
      });
      setSearchResults(response.data);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <form className="search d-flex" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2 col-sm"
          type="search"
          aria-label="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button className="btn btn-search btn-primary" type="submit">
          Search
        </button>
      </form>
      {showResults && (
        <div className="search-results" ref={searchRef}>
          {searchResults.map((res) => (
            <SearchResult key={res._id} data={res} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
