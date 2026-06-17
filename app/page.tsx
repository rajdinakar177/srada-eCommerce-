import Hero             from "@/app/components/Home/Hero";
import Marquee          from "@/app/components/Home/Marquee";
import TrustBar         from "@/app/components/Home/TrustBar";
import Categories       from "@/app/components/Home/Categories";
import FeaturedProducts from "@/app/components/Home/FeaturedProducts";
import Newsletter       from "@/app/components/Home/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <TrustBar />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </>
  );
}
