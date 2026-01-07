const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
  },
};

export const getGenres = async () => {
  const res = await fetch(`${BASE_URL}/genre/movie/list?language=en`, options);
  return res.json();
};

export const getMoviesByGenre = async (genreId: number, page = 1) => {
  const res = await fetch(
    `${BASE_URL}/discover/movie?language=en&with_genres=${genreId}&page=${page}`,
    options
  );
  return res.json();
};

export const getMovieDetail = async (movieId: string) => {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?language=en-US`,
    options
  );
  return res.json();
};
