const API_KEY = '4d8a4a353808b5ad7e70b45d625ccfba'; // <--- PASTE KEY HERE

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    search: (query, page = 1) => `/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
    fetchDetails: (id) => `/movie/${id}?api_key=${API_KEY}&append_to_response=videos`,
};

export default requests;