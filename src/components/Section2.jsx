// src/components/CourseTracker.jsx

import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "affiliate_course_progress_v5";

/* ================= FULL COURSE DATA ================= */

const COURSE_DATA = [
  {
    id: "chapter1",
    title: "CHAPTER 1 - Introduction To Affiliate Marketing",
    lessons: [
      { id: "c1l1", title: "Introduction PDF", url: "https://drive.google.com/file/d/1AKx73_mZdDV3pXDvT8REg08H1iI92upU/view" },
      { id: "c1l2", title: "Product and Company Selection PDF", url: "https://drive.google.com/file/d/1AXam7TVjrsEOLu461NWbFsFaOL-d8PYF/view" },
      { id: "c1l3", title: "Blessednice Ads Guide PDF", url: "https://drive.google.com/file/d/1Aa-Jhr8TyqRwRWDHWGll0nrQ17HHScz4/view" },
      { id: "c1l4", title: "WhatsApp Sales Hack PDF", url: "https://drive.google.com/file/d/1AigEu3KyE9kh9LhhFBzDOstCJV1bmTkU/view" },
      { id: "c1l5", title: "Product Selection Video", url: "https://drive.google.com/file/d/1B6w0yxKaBRrf52s7uYfbD5Tj0oInlIGC/view" },
      { id: "c1l6", title: "Sales Tips Podcast PT1", url: "https://drive.google.com/file/d/1BBAWN9jLXVs_wHrp_4rnbEd9_0EPmzQC/view" },
      { id: "c1l7", title: "Sales Tips Podcast PT2", url: "https://drive.google.com/file/d/1BfpXKUUdZl50cPZfLc7gjFF78r3DUHDb/view" }
    ]
  },
  {
    id: "chapter2",
    title: "CHAPTER 2 - Funnel Setup",
    lessons: [
      { id: "c2l1", title: "WhatsApp Link Creation", url: "https://drive.google.com/file/d/1BsZoiHdvixkAbmdZ2Sy0QoZDe3g0BtCT/view" },
      { id: "c2l2", title: "How to Design an Advert", url: "https://drive.google.com/file/d/1CPsQ37ezVRAG006ozFbkQxhX5qE0ZuZ6/view" },
      { id: "c2l3", title: "Motion Ads Design", url: "https://drive.google.com/file/d/1CdzrqIqEAiB-rS3dqaYeUloHjf1gZMi5f/view" },
      { id: "c2l4", title: "Business WhatsApp Automation", url: "https://drive.google.com/file/d/1Cl9K_zzyUQWklp8LpjWjiIxkCVHF7Rgb/view" },
      { id: "c2l5", title: "Build Landing Page", url: "https://drive.google.com/file/d/1FxQjrA_4EEYcq0W3AqG3cl8TBIMCrHgv/view" },
      { id: "c2l6", title: "Change Name on Facebook", url: "https://drive.google.com/file/d/1GLoAdnkUqQ3Gcozmz2IeSkFQWjHUoDtg/view" }
    ]
  },
  {
    id: "chapter3",
    title: "CHAPTER 3 - Adverts",
    lessons: [
      { id: "c3l1", title: "Introduction to Facebook Ads", url: "https://drive.google.com/file/d/1FrUGszgMXqGeIRPePVgPTb7VRjcB92ag/view" },
      { id: "c3l2", title: "Facebook Page Promotion", url: "https://drive.google.com/file/d/1GWnvmnGNsf-nrPoyefMMjkGULmsKf-G_/view" },
      { id: "c3l3", title: "Facebook Adverts PC Version", url: "https://drive.google.com/file/d/1GcLzE0AZuvvbNPBIjvFaQoHwz9LyMo5f/view" },
      { id: "c3l4", title: "Results from Ads", url: "https://drive.google.com/file/d/1G_dMPpqBjju8OqZ4_jr-5YuFI_iKDygI/view" },
      { id: "c3l5", title: "Facebook Adverts Mobile Version", url: "https://drive.google.com/file/d/1HF9jeJppdZBKpFuKO5daR1_LYu6mmQbZ/view" },
      { id: "c3l6", title: "Instagram Ads Mobile", url: "https://drive.google.com/file/d/1H664FdcjTSd-M4XoRXj3D4MD0n8Se8qu/view" },
      { id: "c3l7", title: "How To Sell Affiliate Marketing Courses", url: "https://drive.google.com/file/d/1HaiY_rQx2_gTQqkktu-z57UlwjF077gT/view" }
    ]
  },
  {
    id: "chapter4",
    title: "CHAPTER 4 - Sales Closing",
    lessons: [
      { id: "c4l1", title: "Blessednice Nathel Chat Guide PDF", url: "https://drive.google.com/file/d/1HTljGakAK_b38HS6Z_JmVzCOrDbCrv3Z/view" },
      { id: "c4l2", title: "How To Sell To Nigerians Podcast", url: "https://drive.google.com/file/d/1HkXnM39UVQoIL4JbUARyUISsBF_Q-NXl/view" },
      { id: "c4l3", title: "WhatsApp Organic Lead", url: "https://drive.google.com/file/d/1HuhGaVmApgWBqHJd1LeKdqgdkzXkvu12/view" },
      { id: "c4l4", title: "How To Automate Your WhatsApp", url: "https://drive.google.com/file/d/1I2xDdFTTET9NlgpE3hkzWcx-EoU8Kgc7/view" },
      { id: "c4l5", title: "Blessed digital", url: "https://youtu.be/y5L31Hreeuo?si=ErEA8S3xVOkDhNT_" },
      { id: "c4l6", title: "Platinum", url: "https://youtu.be/BrXlGbe9DvA?si=Sf190uDv_kjDjeBv" },
      { id: "c4l7", title: "Sales Closing Masterclass", url: "https://youtu.be/CDvjDjTEz38?si=guzt5znC-YM6E6Ab" }
    ]
  },
  {
    id: "chapter5",
    title: "CHAPTER 5 - Follow Up",
    lessons: [
      { id: "c5l1", title: "Sales Closing Podcast", url: "https://drive.google.com/file/d/1I9Zy3-nqH5PC-O_jVEVcyaL-aV38LSdO/view" },
      { id: "c5l2", title: "How To Follow Up A Prospect", url: "https://drive.google.com/file/d/1InkUBkBWJAfnJgtDzhY_xnh5LH_CePDZ/view" }
    ]
  },
 
  {
    id: "chapter6",
    title: "CHAPTER 6 - Where To Start",
    lessons: [
      { id: "c6l1", title: "Where To Start From - Part 1", url: "https://drive.google.com/file/d/1R7_2vpXKr4HEzjjL6bCh1iNN2P5Nc1JB/view" },
      { id: "c6l2", title: "Where To Start From - Part 2", url: "https://drive.google.com/file/d/1IybNHNV8tz79yxbAHpFK994uvneInVvJ/view" }
    ]
  }

];

/* ================= COMPONENT ================= */

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { completedLessons: {} };
  } catch {
    return { completedLessons: {} };
  }
}

export default function CourseTracker() {
  const [progress, setProgress] = useState(loadProgress);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const allLessons = useMemo(
    () => COURSE_DATA.flatMap((c) => c.lessons),
    []
  );

  const isLessonUnlocked = (lessonId) => {
    const index = allLessons.findIndex((l) => l.id === lessonId);
    if (index === 0) return true;
    return progress.completedLessons[allLessons[index - 1].id];
  };

  const markLessonComplete = (lessonId) => {
    setProgress((prev) => ({
      completedLessons: { ...prev.completedLessons, [lessonId]: true }
    }));
  };

  const totalProgress = Math.round(
    (Object.keys(progress.completedLessons).length / allLessons.length) * 100
  );

  const particles = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 6 + 4,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 20 + 15
      })),
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden text-white px-4 py-12 animated-bg">
     <style>
  {`
    .animated-bg {
      background: linear-gradient(-45deg, #6B21A8, #000000, #5B21B6);
      background-size: 400% 400%;
      animation: gradientMove 5s ease infinite;
    }

    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes float {
      0% { transform: translateY(0px); opacity: 10; }
      100% { transform: translateY(-150vh); opacity: 0; }
    }
  `}

      </style>

      {/* Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-10 bg-purple-200 rounded-full opacity-70"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              animation: `float ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-l from-purple-100 to-pink-900 bg-clip-text text-transparent">
          Affiliate Marketing Master Course
        </h1>

        <div className="mb-12">
          <div className="w-full bg-gray-700 h-3 rounded-full">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <p className="text-center mt-2">{totalProgress}% Completed</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {COURSE_DATA.map((chapter) => (
            <div
              key={chapter.id}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl"
            >
              <h2 className="text-lg font-semibold mb-5 text-purple-200">
                {chapter.title}
              </h2>

              <div className="space-y-3">
                {chapter.lessons.map((lesson) => {
                  const unlocked = isLessonUnlocked(lesson.id);
                  const completed = progress.completedLessons[lesson.id];

                  return (
                    <a
                      key={lesson.id}
                      href={lesson.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!unlocked) {
                          e.preventDefault();
                          return;
                        }
                        markLessonComplete(lesson.id);
                      }}
                      className={`flex justify-between items-center p-3 rounded-xl transition ${
                        completed
                          ? "bg-green-600/30 border border-green-500"
                          : unlocked
                          ? "bg-white/5 hover:bg-white/10"
                          : "bg-gray-800/40 opacity-40 cursor-not-allowed pointer-events-none"
                      }`}
                    >
                      <span>{lesson.title}</span>
                      <span>{completed ? "✅" : unlocked ? "▶" : "🔒"}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}