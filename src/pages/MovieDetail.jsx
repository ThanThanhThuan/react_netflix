import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axios';
import requests from '../api/requests';
import ReactPlayer from 'react-player'; // <--- UPDATED IMPORT

const MovieDetail = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchDetail() {
            const request = await axios.get(requests.fetchDetails(id));
            setMovie(request.data);

            const trailer = request.data.videos.results.find(
                (vid) => vid.type === "Trailer" && vid.site === "YouTube"
            );
            if (trailer) setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
        }
        fetchDetail();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="detail-container">
            <h1>{movie.title || movie.name}</h1>
            <p style={{ margin: '1rem 0', color: '#ccc' }}>{movie.overview}</p>

            {trailerUrl ? (
                <div className="video-wrapper">
                    <ReactPlayer
                        className="react-player"
                        url={trailerUrl}
                        width="100%"
                        height="100%"
                        controls
                    />
                </div>
            ) : (
                <h3>No Trailer Available</h3>
            )}
        </div>
    );
};

export default MovieDetail;