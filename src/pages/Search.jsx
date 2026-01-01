/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import axios from '../api/axios';
import requests from '../api/requests';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const { ref, inView } = useInView();

    // 1. Reset when query changes
    useEffect(() => {
        setMovies([]);
        setPage(1);
    }, [query]);

    // 2. Fetch data when page or query changes
    useEffect(() => {
        if (!query) return;

        async function fetchSearch() {
            const request = await axios.get(requests.search(query, page));
            // Append new results to existing movies
            setMovies((prev) => {
                // Simple duplicate check based on ID
                const newMovies = request.data.results.filter(
                    (nm) => !prev.some((pm) => pm.id === nm.id)
                );
                return [...prev, ...newMovies];
            });
        }
        fetchSearch();
    }, [query, page]);

    // 3. Infinite Scroll trigger
    useEffect(() => {
        if (inView) {
            setPage((prev) => prev + 1);
        }
    }, [inView]);

    return (
        <div className="container">
            <h2 style={{ marginTop: '80px' }}>Results for: {query}</h2>
            <div className="grid-container">
                {movies.map((movie) => (
                    movie.poster_path && (
                        <Link key={movie.id} to={`/movie/${movie.id}`} className="grid-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </Link>
                    )
                ))}
            </div>

            {/* Invisible element to trigger next page load */}
            <div ref={ref} style={{ height: '20px', margin: '20px 0', textAlign: 'center' }}>
                {query && <p>Loading more...</p>}
            </div>
        </div>
    );
};

export default Search;