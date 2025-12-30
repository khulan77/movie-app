import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CarouselPlugin } from "./about/components/Carousel";
import { MovieCard } from "./about/components/MovieCard";
import { Fetcher } from "swr";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <MovieCard />
      <Footer />
    </div>
  );
}
