import Hero from "@/components/hero";
import Listing from "@/components/listing";

export default function Home() {
  return (
    <div className="py-px scroll-smooth">
      <Hero />
      <Listing />
    </div>
  );
}
