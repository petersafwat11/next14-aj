import React, { useState } from "react";
import classes from "./cropImage.module.css";
import Cropper from "react-easy-crop";
import getCroppedImg from "./functions";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";

const CropImage = ({
  photoURL,
  setOpenCrop,
  setPhotoURL,
  setFile,
  name,
  setMessage,
  setSelectedAvatar,
  message,
}) => {
  const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`;
  };
  const userFromCookies = Cookies.get("user");

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setFile(file);
      setOpenCrop(false);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);

      const response = await axios.patch(
        `${process.env.BACKEND_SERVER}/users/regulerUsers/looks`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (userFromCookies) {
        const parsedData = JSON.parse(userFromCookies);
        const newData = {
          ...parsedData,
          image: response?.data?.user?.image,
        };
        Cookies.remove("user");
        Cookies.set("user", JSON.stringify(newData));
      }

      setMessage({ ...message, image: response?.data?.user?.image });
      setSelectedAvatar(avatar);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className={classes["container"]}>
      <Image
        onClick={() => {
          setOpenCrop(false);
        }}
        className={classes["close-icon"]}
        src="/svg/exit.svg"
        alt="exit"
        width="12"
        height="12"
      />
      <h3 className={classes["heading"]}>Crop Image & Upload</h3>
      <div className="image-wrapper">
        <Cropper
          className={classes["image"]}
          showGrid={false}
          image={photoURL}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={1}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </div>
      <div className={classes["controllers"]}>
        <div style={{ width: "100%", marginBottom: 1 }}>
          <div>
            {/* <p>Zoom: {zoomPercent(zoom)}</p> */}
            <input
              className={classes["input-rang"]}
              type="range"
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
            />
          </div>
          <div>
            {/* <p>Rotation: {rotation + "°"}</p> */}
            <input
              className={classes["input-rang"]}
              type="range"
              min={0}
              max={360}
              value={rotation}
              onChange={(e) => setRotation(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className={classes["actions"]}>
        <button className={classes["save-image"]} onClick={cropImage}>
          Save Image
        </button>
      </div>
    </div>
  );
};

export default CropImage;
