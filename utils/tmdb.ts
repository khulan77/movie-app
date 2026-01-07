const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// TMDB-аас genre list авах
export async function getGenres() {
  const res = await fetch(`${TMDB_BASE_URL}/genre/movie/list?language=en`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TDMB_KEY}`,
    },
    cache: "no-store",
  });

  return res.json();
}

// TMDB-аас movie list авах (optional genreId)
export async function discoverMovies(genreId?: number, page = 1) {
  const url = genreId
    ? `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreId}&page=${page}`
    : `${TMDB_BASE_URL}/discover/movie?language=en&page=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TDMB_KEY}`,
    },
    cache: "no-store",
  });

  return res.json();
}
