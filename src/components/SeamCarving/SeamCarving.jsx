import React, { useState } from "react";
import styles from "./SeamCarving.module.css";

function SeamCarving() {
  const [imageSrc, setImageSrc] = useState("");
  const [pixels, setPixels] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      console.log(e);
    };

    reader.readAsDataURL(file);
    console.log(file);
  };
  return (
    <>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
    </>
  );
}

export default SeamCarving;
