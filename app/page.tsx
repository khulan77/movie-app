import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { CarouselPlugin } from "./about/components/Carousel";
import { MovieCard } from "./about/components/MovieCard";

export default function Home() {
    return (
        <div>
            <Header />
            
            <MovieCard/>
            <Footer/>
        </div>
    );
}