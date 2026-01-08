import { getMovieDetail, getMovieCredits, getSimilarMovies, getMovieVideos } from "@/utils/tmdb";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function MovieDetailPage({
  params,
}: {
  params: { movieId: string };
}) {
  // params бол Promise учраас await хийх
  const { movieId } = await params;
  if (isNaN(Number(movieId))) notFound();

  if (isNaN(Number(movieId))) {
    notFound();
  }

  const movie = await getMovieDetail(movieId);
    const credits = await getMovieCredits(movieId);
      const similar = await getSimilarMovies(movieId);
       const videos = await getMovieVideos(movieId);
 
  const directors = credits.crew.filter((c: any) => c.job === "Director");
  const writers = credits.crew.filter((c: any) =>
    ["Writer", "Screenplay", "Story"].includes(c.job)
  );

  const stars = credits.cast.slice(0, 5);
  // Гол трейлер (official Youtube)
  const trailer = videos.results.find(
    (v: any) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
     <div>
      <Header/>
    <div className="px-30 flex flex-col gap-8 gap-spacing-6 md:px-20 py-10">
      <div className=" flex flex-col gap-8">
        <div className="flex justify-between">
        <div className="text-4xl font-bold">Wicked
           <p className="text-lg font-normal text-gray-400">{movie.release_date}</p>
           </div>
           <div className="">Rating
            <div className="flex">
              <p className="text-lg font-semibold">⭐ {movie.vote_average}</p>
            <p className="font-normal flex items-center text-base text-gray-400">/10</p>
            </div>
            </div>
           </div>
           <div className="flex gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={290}
          height={428}
          className="rounded-xl"
        />
        {/* Trailer */}
      {trailer && (
        <div>
          <div className="w-">
            <iframe
            className="rounded-xl"
              width={760}
              height={429}
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
        </div>

        <div className="space-y-4">
             <div className="flex gap-2 flex-wrap ">
            {movie.genres.map((g: any) => (
              <Badge
                key={g.id}
                className="px-3 py-1 text-sm bg-white text-xs font-semibold rounded-full border border-gray-300"
              >
                {g.name}
              </Badge>
            ))}
          </div>
          <p className="font-normal text-base text-[#09090B]">{movie.overview}</p>
          {/* Director */}
      <div className="flex gap-[53px]">
        <h2 className="text-base font-bold ">Director</h2>
        <p className="text-base font-normal flex items-center">{directors.map((d: any) => d.name).join(", ")}</p>
      </div>
      <div className="border-1 border-gray-200 w-full "></div>
       {/* Writers */}
      <div className="flex gap-[53px]">
        <h2 className="text-base font-bold  text-[#09090b] flex items-center">Writers</h2>
        <p>{writers.map((w: any) => w.name).join(", ")}</p>
      </div>
         <div className="border-1 border-gray-300 w-full "></div>
           {/* Stars */}
      <div className="flex gap-[53px]">
        <h2 className="text-base font-bold ">Stars</h2>
        <div className="flex gap-4 overflow-x-auto">
          {stars.map((s: any) => (
            <div key={s.id} className="flex items-center">
              <p className="text-sm font-medium flex items-center ">{s.name} {s.character}</p>
            </div>
          ))}
        </div>
      </div>
         <div className="border-1 border-gray-300 w-full "></div>
        </div>
      </div>
     
     <div className="flex flex-col">
      <div className="flex justify-between ">
          <h2 className="text-2xl font-semibold mb-4">More like this</h2>
        <div className="flex items-center">See more <ArrowRight width={16} height={16}/></div>
      </div>
        <div className="flex gap-4 overflow-x-auto">
  {similar.results.slice(0, 5).map((m: any) => (
    <Link key={m.id} href={`/movie/${m.id}`} className="flex-shrink-0 w-40">
      <div className="rounded-lg overflow-hidden shadow-lg">
        {/* Poster image: дээд буланд border-radius */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
          alt={m.title}
          width={160}
          height={240}
          className="object-cover w-full h-[240px] rounded-t-lg"
        />

        {/* Info box: зөвхөн доод буланд border-radius */}
        <div className="bg-gray-300 p-2 rounded-b-lg">
          <div className="flex items-center gap-1">
            <img src="/Star.png" alt="Star" className="w-3 h-3" />
            <p className="text-[12px] md:text-[14px]">{m.vote_average}</p>
            <p className="opacity-50 text-[12px]">/10</p>
          </div>
          <p className="text-sm font-medium truncate">{m.title}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

      </div>
    </div>
     <Footer/>
    </div>
  );
}
