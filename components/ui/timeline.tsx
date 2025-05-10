"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Particles } from "@/components/ui/particles";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  citation: string;
}

interface TimelineEra {
  era: string;
  events: TimelineEvent[];
}

interface TimelineData {
  timeline: TimelineEra[];
}

export const Timeline = () => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetch('/timeline.json');
        const data = await response.json();
        setTimelineData(data);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      }
    };

    fetchTimelineData();
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, timelineData]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  // Helper function to ensure image paths start with a forward slash
  const getImagePath = (imagePath: string) => {
    if (!imagePath) return '';
    
    // If the path doesn't start with a slash, add one
    const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    
    // Check if the file extension is jpg/jpeg for Cao image which appears to have a different name in the filesystem
    if (normalizedPath.includes('cao_animals.jpg')) {
      return '/images/Cao.png';
    }
    
    return normalizedPath;
  };

  const handleImageError = (imagePath: string) => {
    setImageErrors(prev => ({ ...prev, [imagePath]: true }));
  };

  if (!timelineData) {
    return <div className="text-center py-20 text-white">Loading timeline data...</div>;
  }

  return (
    <div
      className="w-full bg-neutral-900 font-sans md:px-10 relative"
      ref={containerRef}
    >
      <Particles
        className="absolute inset-0 z-0 pointer-events-none"
        quantity={1000}
        color="#6366f1"
        ease={80}
        size={2}
      />
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 z-10">
        <div
          className="absolute md:left-8 left-8 top-0 bottom-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-600 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>

        {timelineData.timeline.map((era, eraIndex) => (
          <div key={eraIndex} className="mb-20">
            <div className="relative">
              <div className="absolute md:left-5 left-5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-500 z-10"></div>
              <div className="pl-14 -ml-8 pr-4">
                <div className="bg-gradient-to-r from-neutral-800/90 via-neutral-800/90 to-transparent py-4 px-6 rounded-lg backdrop-blur-sm border-l-4 border-blue-500 shadow-lg">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{era.era}</h2>
                </div>
              </div>
            </div>
            
            {era.events.map((event, eventIndex) => (
              <div
                key={eventIndex}
                className="flex justify-start pt-10 md:pt-16 md:gap-10"
              >
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-neutral-800 flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-700 border border-neutral-600 p-2" />
                  </div>
                  <div className="hidden md:block md:pl-20">
                    <h3 className="text-xl md:text-3xl font-bold text-white">
                      {event.year}
                    </h3>
                    <p className="text-lg font-medium text-neutral-300">
                      {event.title}
                    </p>
                  </div>
                </div>

                <div className="relative pl-20 pr-4 md:pl-4 w-full">
                  <div className="md:hidden mb-4">
                    <h3 className="text-xl font-bold text-white">
                      {event.year}
                    </h3>
                    <p className="text-lg font-medium text-neutral-300">
                      {event.title}
                    </p>
                  </div>
                  
                  <div className="bg-neutral-800 rounded-xl p-6 shadow-md border border-neutral-700">
                    <p className="mb-4 text-neutral-200">
                      {event.description}
                    </p>
                    
                    {event.image && event.image !== "" && !imageErrors[event.image] && (
                      <div className="my-4 relative h-60 w-full">
                        <Image 
                          src={getImagePath(event.image)} 
                          alt={event.title}
                          fill
                          className="object-contain rounded-lg"
                          onError={() => handleImageError(event.image || '')}
                        />
                      </div>
                    )}
                    
                    {event.citation && (
                      <div className="mt-4 text-sm text-neutral-400 italic">
                        {event.citation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
