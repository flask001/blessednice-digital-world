import React, { useRef, useState, useEffect } from "react";

const features = [
  {
    title: "Trusted Affiliate Programs",
    description:
      "We partner with top-rated platforms like Amazon Associates, Expertnaire, and others to ensure you earn from high-converting and trusted affiliate products.",
    icon: (
      <svg
        className="w-12 h-12 text-purple-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M10 13a5 5 0 0 1 7 7l-1 1a5 5 0 0 1-7-7m4-4a5 5 0 0 0-7-7l-1 1a5 5 0 0 0 7 7" />
      </svg>
    ),
  },
  {
    title: "Beginner-Friendly Training",
    description:
      "Whether you're new or experienced, our step-by-step training helps you start and grow your affiliate marketing business with practical strategies and tools.",
    icon: (
      <svg
        className="w-12 h-12 text-purple-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14l6.16-3.422A12.083 12.083 0 0 1 12 20.055 12.083 12.083 0 0 1 5.84 10.578L12 14z" />
      </svg>
    ),
  },
  {
    title: "24/7 Community Support",
    description:
      "Join our online community of affiliate marketers to share ideas, ask questions, and get support any time. You're never alone on your journey.",
    icon: (
      <svg
        className="w-12 h-12 text-purple-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M17 20h5v-2a4 4 0 0 0-5-3.87" />
        <path d="M9 20H4v-2a4 4 0 0 1 5-3.87" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

function FeatureCard({ feature }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--x", `${x}px`);
    cardRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="relative snap-center min-w-[85%] sm:min-w-0  backdrop-blur-md rounded-3xl p-10 shadow-md transition-transform duration-300 hover:-translate-y-2 overflow-hidden"
      style={{
        background:
          "radial-gradient(600px circle at var(--x) var(--y), rgba(236,72,153,0.5), transparent 40%)",
      }}
    >
      <div className="flex justify-center mb-6">{feature.icon}</div>
      <h3 className="text-2xl font-semibold text-slate-800 text-center mb-4">
        {feature.title}
      </h3>
      <p className="text-slate-600 text-center leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export default function WhyChooseUs() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const scrollToIndex = (index) => {
    const container = sliderRef.current;
    const cardWidth = container.firstChild.offsetWidth + 32;
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % features.length;
    scrollToIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      (currentIndex - 1 + features.length) % features.length;
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 10000);
    return () => clearInterval(intervalRef.current);
  }, [currentIndex]);

  const resetAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(nextSlide, 10000);
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 relative">
        <h2 className="text-4xl font-bold text-center  bg-gradient-to-r from-pink-800 to-purple-700 bg-clip-text text-transparent mb-14">
          Why Choose Us
        </h2>

        {/* Arrows */}
        <div className="sm:hidden flex justify-between absolute top-[55%] left-0 right-0 px-2 z-10">
          <button
            onClick={() => {
              prevSlide();
              resetAutoSlide();
            }}
            className="bg-white shadow-md rounded-full p-3"
          >
            ‹
          </button>
          <button
            onClick={() => {
              nextSlide();
              resetAutoSlide();
            }}
            className="bg-white shadow-md rounded-full p-3"
          >
            ›
          </button>
        </div>

        <div
          ref={sliderRef}
          onScroll={resetAutoSlide}
          className="flex sm:grid sm:grid-cols-3 gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="sm:hidden flex justify-center mt-6 gap-3">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                scrollToIndex(index);
                resetAutoSlide();
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? "bg-purple-700 scale-125"
                  : "bg-pink-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}