"use client";

import { useEffect, useState } from "react";

interface Characters {
  name: string;
  thumbnail: string;
  image: string;
}

interface CharactersData {
  characters: Characters[];
}

export default function HomePage() {
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [showImages, setShowImages] = useState<boolean>(false); // Add state to control image visibility
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null); // Track selected image index

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }

    fetch('/characters/characters.json')
      .then(response => response.json())
      .then((data: CharactersData) => { // SET TYPESCRIPT HERE
        const images = data.characters.map(characters => characters.image);
        const thumbnails = data.characters.map(characters => characters.thumbnail); // ADD THE THUMBNAILS
        setImages(images);
        setThumbnails(thumbnails); // SET THUMBNAILS STATE
      })
      .catch(error => console.error("Error fetching characters:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <img src="/characterSelect.gif" alt="Character Select" className="mb-4" style={{ width: '25%', height: '25%' }} />
      <audio id="bg-music" autoPlay loop>
        <source src="/bgmusic.mp3" type="audio/mpeg" />
      </audio>
      <section className="w-full flex flex-col items-center" 
                style={{
                backgroundImage: 'url(https://res.cloudinary.com/drfhleop1/image/upload/v1727562291/luxa.org-opacity-changed-luxa.org-opacity-changed-tumblr_static_ckdagdn5uxkcwo4804c8co4c8_2048_v2_gf81m4.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'}}>
        <div className="w-1/2 flex justify-between">
          
          {/* LEFT GRIDS */}
          <div className="text-white text-2xl flex flex-col items-center">
            {selectedImageIndex !== null && images[selectedImageIndex] && ( // Check if an image is selected
              <>
                <img
                  key={selectedImageIndex}
                  src={images[selectedImageIndex]} // Use the selected image
                  alt={`Left Image ${selectedImageIndex + 1}`}
                  className="mt-2"
                  style={{ width: '500px', height: '500px' }} // Set fixed size for all images
                />
                <p className="mt-2">{`Description for Image ${selectedImageIndex + 1}`}</p>
              </>
            )}
          </div>

          {/* RIGHTGRIDS */}
          <div className="w-1/2 flex flex-col items-center justify-center">
            <div className="grid grid-cols-4 grid-rows-8 py-6 cursor-pointer justify-center">
              {thumbnails.length > 0 && thumbnails.map((thumbnail, index) => ( // Check if thumbnails is not empty
                <div
                  key={index}
                  className="border aspect-square hover:border-4 hover:border-orange-500"
                  style={{ width: '80px', height: '80px' }}
                  onClick={() => {
                    setSelectedImageIndex(index); // Set selected image index on click
                    setShowImages(true); // Show images when a grid is clicked
                  }}
                >
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }} // IMAGE SIZE
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
