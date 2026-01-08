"use client";

import { useEffect, useState } from "react";
import { getMovieVideos } from "@/utils/tmdb";
type Video = {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
};

export const MovieTrailer = ({ movieId }: { movieId: number }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovieVideos(movieId)
      .then((res) => {
        // Трейлеруудыг filter хийнэ
        const trailers = res.filter(
          (v: Video) => v.type === "Trailer" && v.site === "YouTube"
        );
        setVideos(trailers);
      })
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading trailers...</p>;
  if (videos.length === 0) return <p>No trailers found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {videos.map((video) => (
        <div key={video.id} className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${video.key}`}
            title={video.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};
