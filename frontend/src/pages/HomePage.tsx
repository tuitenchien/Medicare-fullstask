import HeroSection from "../components/HeroSection";
import HospitalSection from "../components/HospitalSection";
import SpecialtySection from "../components/SpecialtySection";
import StatsSection from "../components/StatsSection";

export default function HomePage() {
  return (
      <div className="bg-[#f1f9fe] w-full h-[600px]">
        <div className="max-w-6xl mx-auto items-center min-h-screen">
          <HeroSection/>
          <StatsSection/>
          <SpecialtySection/>
          <HospitalSection/>
        </div>
      </div>
  );
}
