import Hero from "@/components/home/Hero/Hero";
import About from "@/components/home/About/About";
import Popular from "@/components/home/Popular/Popular";
import OurTravellers from "@/components/home/OurTravellers/OurTravellers";
import Join from "@/components/home/Join/Join";

export default function HomePage() {
    return (
        <>
            <Hero/>
            <About/>
            <Popular/>
            <OurTravellers/>
            <Join/>
        </>
    );
}
