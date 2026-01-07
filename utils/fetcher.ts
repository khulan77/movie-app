// utils/fetcher.ts
export const fetcher = async (url: string) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`, // зөв token
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch TMDB API");
  }

  return response.json();
};
