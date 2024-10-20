import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

const apiKey = import.meta.env.VITE_KEY;

// home page
export const fetchMoviesByCategory = async (category) => {
  const url = `https://api.themoviedb.org/3/movie/${category}?api_key=${apiKey}&language=en-US&page=1`; // Construct URL dynamically

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
    return [];
  }
};

// categories page
export const fetchGenres = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

export const fetchMovies = async (apiKey, selectedGenres, currentPage) => {
  try {
    const genreQuery = selectedGenres.join(",");
    const url = genreQuery
      ? `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreQuery}&page=${currentPage}`
      : `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${currentPage}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

// In your util/http.js file
export const fetchMovieTrailers = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch trailers");
  }
  return response.json();
};
