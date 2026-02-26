import React, { useEffect, useRef, useState } from "react";

export default function ContactSection() {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    // Load Google Maps script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY`;
    script.async = true;
    script.onload = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const initialPosition = { lat: latitude, lng: longitude };

            // Initialize map
            const mapInstance = new window.google.maps.Map(mapRef.current, {
              center: initialPosition,
              zoom: 15,
            });
            setMap(mapInstance);

            // Add marker
            const marker = new window.google.maps.Marker({
              position: initialPosition,
              map: mapInstance,
              title: "You are here",
            });
            markerRef.current = marker;
          },
          (error) => console.error("Error getting location:", error)
        );

        // Watch for position changes
        const watchId = navigator.geolocation.watchPosition(
          (position) => {
            if (markerRef.current && map) {
              const newPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              markerRef.current.setPosition(newPos);
              map.setCenter(newPos);
            }
          },
          (error) => console.error("Error watching position:", error)
        );

        // Cleanup on unmount
        return () => navigator.geolocation.clearWatch(watchId);
      } else {
        console.error("Geolocation not supported");
      }
    };
    document.body.appendChild(script);
  }, [map]);

  return (
    <section className="py-16 px-4 bg-gradient-to-t from-white via-white to-purple-50 ">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-center  mb-12   bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left - Live Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg h-[450px] w-full">
            <div ref={mapRef} className="w-full h-full" />
          </div>

          {/* Right - Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                rows="6"
                placeholder="Write your message here..."
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl text-white text-lg font-semibold bg-gradient-to-r from-purple-800 to-black hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}