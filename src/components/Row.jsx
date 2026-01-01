import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row-posters">
                {movies.map(
                    (movie) =>
                        ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                            <Link key={movie.id} to={`/movie/${movie.id}`}>
                                <img
                                    className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                    alt={movie.name}
                                />
                            </Link>
                        )
                )}
            </div>
        </div>
    );
};

export default Row;