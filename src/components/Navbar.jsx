import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) navigate(`/search?q=${query}`);
    };

    return (
        <div className="nav">
            <Link to="/" className="nav-logo">THAN NETFLIX CLONE</Link>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    className="nav-search"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </form>
        </div>
    );
};

export default Navbar;