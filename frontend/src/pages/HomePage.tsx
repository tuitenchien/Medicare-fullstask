import HeroSection from "../components/HeroSection";
import MainLayout from "../layouts/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="bg-[#f1f9fe] w-full h-[600px]">
        <div className="max-w-6xl mx-auto items-center"  >
          <HeroSection/>
        </div>
      </div>
    </MainLayout>
  );
}
