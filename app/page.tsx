import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MovieCard } from "./about/components/MovieCard";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      <MovieCard />
      <Footer />
    </div>
  );
}
