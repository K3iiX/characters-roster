"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null); 
  const [thumbnails, setThumbnails] = useState<string[]>([]); // Ensure it's initialized as an empty array

  useEffect(() => {
    const audio = document.getElementById("bg-music") as HTMLAudioElement;
    if (audio) {
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }

    // Fetch thumbnails from JSON
    fetch('characters.json') // Adjust the path as necessary
    .then(response => {
      // Log the response data
      return response.json().then(data => {
        console.log("Data:", data); // Log the data
          return data;
        });
      })
      .then(data => setThumbnails(data.thumbnail || [])) // Use the thumbnail array or an empty array
      .catch(error => console.error("Error fetching thumbnails:", error));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <audio id="bg-music" autoPlay loop>
        <source src="/bgmusic.mp3" type="audio/mpeg" />
      </audio>
      <section className="w-full flex flex-col items-center">
        <img src="/characterSelect.gif" alt="Description of GIF" className="my-4" />
        <div className="w-full flex justify-center">
          {/* LEFT GRIDS */}
          <div className="text-white text-2xl"> 
            {/* New left images */}
            {/* {Array.from({ length: 1 }, (_, index) => (
              <img 
                key={index} 
                src={`leftImages/image${index + 1}.png`}
                alt={`Left Image ${index + 1}`} 
                className="mt-2" 
                style={{ width: '100px', height: '100px' }}
              />
            ))} */}
          </div>
          
          {/* CENTER GRIDS */}
          <div className="w-1/2 flex justify-center">
            <div className="grid grid-cols-4 grid-rows-8 py-6 cursor-pointer">
              {thumbnails.length > 0 && thumbnails.map((thumbnail, index) => ( // Check if thumbnails is not empty
                <div 
                  key={index} 
                  className="border aspect-square hover:border-4 hover:border-green-500" 
                  style={{ width: '125px', height: '125px' }}
                  onClick={() => setSelectedImage(thumbnail)} // Set selected image on click
                >
                  <img 
                    src={thumbnail} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover" 
                    style={{ width: '100%', height: '100%' }} // Set fixed size for images
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT GRIDS */}
          <div className="text-white text-2xl"> 
            <h1>SUSUSUSU</h1>
          </div>
        </div>
      </section>
    </main>
  );
}
