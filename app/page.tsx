import { HeroSection } from "@/components/HeroSection";
import { Timeline } from "@/components/ui/timeline";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div id="timeline" className="py-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">Timeline</h2>
          <p className="mb-8 text-center max-w-3xl mx-auto text-lg text-neutral-300">
            Explore the historical evolution of keypoint estimation in AI, from early facial analysis 
            approaches to the standardization of human pose estimation and its extension to animal subjects.
          </p>
          <Timeline />
        </div>
      </div>
    </main>
  );
}
