import { useEffect, useState } from "react";

export default function useDeviceTilt() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isMobile = "DeviceOrientationEvent" in window;

    const handleOrientation = (event) => {
      const { beta = 0, gamma = 0 } = event;

      setTilt({
        x: Math.max(-25, Math.min(25, beta)),
        y: Math.max(-25, Math.min(25, gamma)),
      });
    };

    const handleMouse = (event) => {
      const { innerWidth, innerHeight } = window;

      const x = ((event.clientY / innerHeight) - 0.5) * 30;
      const y = ((event.clientX / innerWidth) - 0.5) * -30;

      setTilt({ x, y });
    };

    const enableOrientation = async () => {
      if (
        typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function"
      ) {
        try {
          const permission = await DeviceOrientationEvent.requestPermission();
          if (permission === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        } catch {
          return;
        }
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };

    enableOrientation();
    window.addEventListener("mousemove", handleMouse);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return tilt;
}