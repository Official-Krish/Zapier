import { Hero } from "./components/hero";
import { HeroVideo } from "./components/heroVideo";

export default function Home() {
  return (
    <main className="pb-48">
      <Hero/>
      <div className="pt-8">
        <HeroVideo/>
      </div>
      
    </main>
  );
}
