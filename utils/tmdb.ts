const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export async function getGenres() {
  const res = await fetch(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
    cache: "no-store",
  });

  return res.json();
}

export async function discoverMovies(genreId?: number, page = 1) {
  const url = genreId
    ? `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreId}&page=${page}`
    : `${TMDB_BASE_URL}/discover/movie?language=en&page=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
    cache: "no-store",
  });

  return res.json();
}
