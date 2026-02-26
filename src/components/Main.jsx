import { motion, useMotionValue, useSpring } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import { useEffect } from "react";

/* =========================
   DATA — UK TESTIMONIALS
========================= */
const testimonials = [
  {
    name: "Oliver Thompson",
    role: "Affiliate Blogger",
    text:
      "Before joining BlessedNice Digital World, I struggled to understand affiliate marketing properly. The step-by-step guidance helped me build a system that now generates consistent commissions every month. The strategies are practical and easy to implement even for beginners.",
  },
  {
    name: "Emily Carter",
    role: "Digital Entrepreneur",
    text:
      "The training completely changed how I approach online marketing. I learned how to choose profitable products, create content that converts, and build trust with my audience. Within weeks I started seeing measurable results.",
  },
  {
    name: "James Walker",
    role: "Content Creator",
    text:
      "I had traffic but no monetization strategy. BlessedNice showed me exactly how to turn visitors into buyers using affiliate funnels. The lessons are modern, clear, and extremely actionable.",
  },
  {
    name: "Sophia Bennett",
    role: "Online Marketer",
    text:
      "What I love most is how beginner-friendly everything is. The explanations are simple yet powerful. I launched my first successful affiliate campaign shortly after completing the lessons.",
  },
  {
    name: "Daniel Hughes",
    role: "YouTuber",
    text:
      "I finally understand audience monetization. Instead of guessing, I now follow a proven structure that helps me recommend products naturally while maintaining trust with viewers.",
  },
  {
    name: "Charlotte Evans",
    role: "Freelancer",
    text:
      "The platform gave me clarity and confidence to start earning online. The affiliate strategies work across multiple niches and helped me create an additional passive income stream.",
  },
];

/* =========================
   🌌 FLOATING NEBULA WAVES
========================= */
const Nebula = () => (
  <>
    <motion.div
      animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
      transition={{ duration: 18, repeat: Infinity }}
      className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-400/30 blur-[140px] rounded-full"
    />
    <motion.div
      animate={{ x: [0, -90, 0], y: [0, 70, 0] }}
      transition={{ duration: 22, repeat: Infinity }}
      className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-pink-400/30 blur-[150px] rounded-full"
    />
  </>
);

/* =========================
   🌌 GALAXY STARS
========================= */
function GalaxyBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const move = (e) => {
      mouseX.set((e.clientX - window.innerWidth / 2) / 40);
      mouseY.set((e.clientY - window.innerHeight / 2) / 40);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const stars = Array.from({ length: 45 });

  return (
    <motion.div
      style={{ x: smoothX, y: smoothY }}
      className="absolute inset-0 pointer-events-none"
    >
      {stars.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-purple-400"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.6, 1.3, 0.6],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
          }}
        >
          <Star size={10} fill="currentColor" />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* =========================
   VERIFIED BADGE
========================= */
const VerifiedBadge = () => (
  <div className="flex items-center gap-1 text-purple-900 text-xs font-semibold">
    <CheckCircle size={14} />
    Verified Student
  </div>
);

/* =========================
   RATING STARS
========================= */
const Stars = () => (
  <div className="flex gap-1 mt-4 text-purple-600">
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} fill="currentColor" />
    ))}
  </div>
);

/* =========================
   3D TILT CARD
========================= */
function TiltCard({ children }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const move = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set((e.clientX - rect.left - rect.width / 2) / 18);
    rotateX.set(-(e.clientY - rect.top - rect.height / 2) / 18);
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={move}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */
export default function Testimonials() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-gray-50 to-white overflow-hidden">

      {/* Background Effects */}
      <Nebula />
      <GalaxyBackground />

      <div className="relative max-w-7xl mx-auto">

        <h2 className="text-center text-4xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
          What Our Students Say
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => {

            /* RANDOM HUMAN PHOTOS */
            const avatar = `https://randomuser.me/api/portraits/${
              Math.random() > 0.5 ? "men" : "women"
            }/${Math.floor(Math.random() * 90)}.jpg`;

            return (
              <TiltCard key={index}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl rounded-3xl p-6 hover:shadow-2xl transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={avatar}
                      alt={item.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-400/40"
                    />

                    <div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.role}</p>
                      <VerifiedBadge />
                    </div>
                  </div>

                  <p className="text-gray-700 italic leading-relaxed">
                    “{item.text}”
                  </p>

                  <Stars />
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}