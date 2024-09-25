"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <audio id="bg-music" autoPlay loop>
        <source src="/bgmusic.mp3" type="audio/mpeg" />
      </audio>
      <section className="w-full flex flex-col items-center">
        <img src="/characterSelect.gif" alt="Description of GIF" className="my-4" />
        <div className="w-1/2 flex justify-center">
          <div className="grid grid-cols-4 grid-rows-8 py-6">
            {Array.from({ length: 24 }, (_, index) => (
              <div key={index} className="border aspect-square" style={{ width: '125px', height: '125px' }}>
                <img src={`characters/image${index + 1}.png`} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
