"use client";
import React, { useEffect, useState } from "react";
import "../scss/slide.scss";
export default function Slide() {
  interface Image {
    url: string;
  }

  const [image, setImage] = useState<Image[]>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className="gallery">
        {image.map((item, index) => (
          <div className="gallery_item">
            <img key={index} src={item.url} alt="" className="gallery_image" />
          </div>
        ))}
      </div>
    </>
  );
}
