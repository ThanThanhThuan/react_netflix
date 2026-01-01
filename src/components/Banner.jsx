import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import requests from '../api/requests';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchTrending);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
        }
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <header className="banner"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            }}
        >
            <div className="banner-contents">
                <h1 className="banner-title">{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className="banner-buttons">
                    <button className="btn btn-play" onClick={() => navigate(`/movie/${movie.id}`)}>Play</button>
                    <button className="btn btn-more">My List</button>
                </div>
                <h1 className="banner-desc">{truncate(movie?.overview, 150)}</h1>
            </div>
            <div className="banner-fadeBottom" />
        </header>
    );
};

export default Banner;