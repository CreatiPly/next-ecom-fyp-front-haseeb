import { useState } from "react";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);
  return (
    <div className="flex flex-col">
      <div className="mb-4 w-full h-[400px] bg-accent rounded-lg overflow-hidden">
        <img
          src={activeImage}
          className="w-full h-full object-contain"
          alt="Active product image"
        />
      </div>
      <div className="flex space-x-2 overflow-x-auto">
        {images.map((image) => (
          <div
            key={image}
            className={`cursor-pointer border-2 rounded-md overflow-hidden flex-shrink-0 ${
              image === activeImage ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setActiveImage(image)}
          >
            <div className="w-20 h-20 bg-accent">
              <img
                src={image}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
