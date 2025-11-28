// src/components/OurStoryTimeline.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Phone, HeartPulse, Briefcase, Heart, Lightbulb, CheckCircle, Users } from 'lucide-react';

// Define the structure for a story point
interface StoryPoint {
  id: number;
  title: string;
  summary: string; // Concise text shown initially
  fullStory: string; // Detailed text revealed on hover
  icon: React.ElementType; // Type for Lucide icons
}

// The story broken down into key points with summary and full story
const storyPoints: StoryPoint[] = [
  {
    id: 1,
    //title: "The Genesis of a Crisis",
    title: "How it Started",
    summary: "It began not as a company, but as weekly phone calls between friends, sharing the immense toll of eldercare on our families.",
    fullStory: "It began not as a company, but as weekly phone calls. We were friends, but we shared the same private crisis. Watching the immense toll of eldercare fall on our families.",
    icon: Phone,
  },
  {
    id: 2,
    title: "The Turning Point",
    summary: "My father-in-law's vascular dementia was the catalyst. I watched my wife, a banking executive, grapple with administrative chaos.",
    fullStory: "My father-in-law's vascular dementia was the turning point. I watched my wife, a banking executive, wrestle with hospital appointments, frustrating calls to officials, and endless financial applications the very definition of administrative chaos.",
    icon: HeartPulse,
  },
  {
    id: 3,
    title: "Our Weekly Calls",
    summary: "Despite our professional success, we felt utterly powerless. Our weekly calls became our only therapeutic space.",
    fullStory: "We were successful professionals who felt powerless. Our weekly calls became our only therapeutic space, a place where we could trade insights, admit the sheer impossibility of the juggling act.",
    icon: Briefcase,
  },
  {
    id: 4,
    title: "The Shared Agony",
    summary: "Our bond was only understood by others fighting this specific, high-stakes battle. That shared agony was the true foundation of Poetiq.",
    fullStory: "Our weekly calls became our only therapeutic space, a place where we could trade insights, admit the sheer impossibility of the juggling act, and realize that our bond was only understood by others fighting this specific, high-stakes fight. That shared agony was the true foundation of Poetiq.",
    icon: Heart,
  },
  {
    id: 5,
    title: "An Executive Strategy",
    summary: "We stopped just coping and started applying three decades of executive strategy to the personal chaos.",
    fullStory: "We stopped just coping and started applying three decades of executive strategy to the personal chaos.",
    icon: Lightbulb,
  },
  {
    id: 6,
    title: "Profound Relief",
    summary: "We are committed to sharing that blueprint, helping you find answers to complex demands and experience profound relief.",
    fullStory: "Now, we are committed to sharing that blueprint. We don't just help you find answers to complex demands like grant applications or care home reviews; we help you experience the profound relief of knowing you are not compromising your parents' dignity or your own professional future.",
    icon: CheckCircle,
  },
  {
    id: 7,
    title: "Join Our Community",
    summary: "We’re building this community because we need it. Now, we invite you to join us!",
    fullStory: "We’re building this community because we need it. Now, we invite you to join us!",
    icon: Users,
  },
];

export function OurStoryTimeline() {
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.getAttribute('data-id') || '0');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id));
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
      }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref);
        }
      });
    };
  }, []);

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
          This is Our Story
        </h2>

        <div className="relative">
          {/* Vertical Line: This is the central line of the timeline */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-400 to-purple-400 h-full rounded-full"></div>

          {storyPoints.map((point, index) => {
            const isEven = index % 2 === 0;
            const isVisible = visibleItems.has(point.id);
            const IconComponent = point.icon;

            return (
              <div
                key={point.id}
                ref={(el) => (timelineRefs.current[index] = el)}
                data-id={point.id}
                className={`mb-12 flex items-center w-full relative ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              >
                {/* Content Block: Displays the title and description */}
                <StoryPointCard
                  point={point}
                  isEven={isEven}
                  isVisible={isVisible}
                  IconComponent={IconComponent}
                />

                {/* Circle with Icon: Positioned on the central vertical line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center 
                    ${isVisible ? 'bg-blue-600 text-white shadow-lg scale-100' : 'bg-gray-300 text-gray-600 scale-75'}
                    transition-all duration-700 ease-out`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Spacer: Used to push the content block away from the center line on desktop */}
                <div className="hidden md:block w-1/2"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// New sub-component to handle hover state and text swapping
interface StoryPointCardProps {
  point: StoryPoint;
  isEven: boolean;
  isVisible: boolean;
  IconComponent: React.ElementType;
}

function StoryPointCard({ point, isEven, isVisible }: StoryPointCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`w-full md:w-1/2 p-6 rounded-lg shadow-md bg-white 
        ${isEven ? 'md:ml-auto md:text-right' : 'md:mr-auto md:text-left'}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        transition-all duration-700 ease-out cursor-pointer relative`} // Added cursor-pointer and relative
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{point.title}</h3>
      <div className="relative min-h-[4rem]"> {/* Added min-h to prevent layout shift if fullStory is shorter */}
        <p className={`text-gray-700 transition-opacity duration-300 absolute top-0 left-0 w-full
          ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          {point.summary}
        </p>
        <p className={`text-gray-700 transition-opacity duration-300 absolute top-0 left-0 w-full
          ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {point.fullStory}
        </p>
      </div>
    </div>
  );
}
