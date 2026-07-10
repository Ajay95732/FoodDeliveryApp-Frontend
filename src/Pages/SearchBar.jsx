import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group shadow-sm">

        <span className="input-group-text bg-white border-end-0">
          <FaSearch />
        </span>

        <input
          type="text"
          className="form-control border-start-0"
          placeholder="Search for Pizza, Burger, Biryani..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-warning fw-bold"
        >
          Search
        </button>

      </div>
    </form>
  );
}