import image1 from "../../../public/image1.png";
import image2 from "../../../public/image2.png";
import image3 from "../../../public/image3.png";
import image4 from "../../../public/image4.png";
import "./Pictures.css";
import React from "react";

export default function Pictures() {
  return (
    <div className="startPictures">
      <img className="startPicture1" src={"../../../public/image1.png"}></img>
      <img className="startPicture2" src={"../../../public/image2.png"}></img>
      <img className="startPicture3" src={"../../../public/image3.png"}></img>
      <img className="startPicture4" src={"../../../public/image4.png"}></img>
    </div>
  );
}
