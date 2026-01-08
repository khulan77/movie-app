import { discoverMovies } from "@/utils/tmdb";

export default async function GenrePage({
  params,
}: {
  params: { id: string };
}) {
  const movies = await discoverMovies(Number(params.id));

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">Genre: {params.id}</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {movies.results.map((movie: any) => (
          <div key={movie.id}>{movie.title}</div>
        ))}
      </div>
    </div>
  );
}
