import { MovieCard, movieApi, Movie } from "@/app/about/components/MovieCard";

export default async function Page({
  params,
}: {
  params: Promise<{ movieCategory: string }>;
}) {
  const { movieCategory } = await params;

  const movieResults: Movie[] = await movieApi(movieCategory);
  console.log(movieResults);

  return (
    <div>
      <h1>Category: {movieCategory}</h1>

      <div>
        {movieResults.map((films) => (
          <MovieCard key={films.id} movie={films} />
        ))}
      </div>
    </div>
  );
}
