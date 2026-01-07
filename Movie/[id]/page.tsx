import { getMovieDetail } from "@/utils/tmdb";

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovieDetail(params.id);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
      <p className="mt-4">{movie.overview}</p>
    </div>
  );
}
