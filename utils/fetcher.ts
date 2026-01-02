export const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_KEY}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch");
  }

  return await response.json();
};
