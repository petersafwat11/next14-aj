import Image from "next/image";
import { useRef, useState } from "react";
import Popup from "../../popupWrapper/Popup";
import RightPart from "./RightPart";
import { Actions, TopPart } from "./TopAndBottom";
import classes from "./changeAvatar.module.css";
import ImageWithLoading from "./image/Image";
import CropImage from "../imageUpload/crop/CropImage";

const ChangeAvatar = ({
  toggleChangeAvatar,
  selectAvatar,
  avatars,
  selectedAvatar,
  name,
  setMessage,
  setSelectedAvatar,
  message,
}) => {
  const [newSelectedAvatar, setNewSElectedAvatar] = useState();
  const applyChanges = () => {
    selectAvatar(`/svg/chat/avatars/${newSelectedAvatar}.svg`);
    toggleChangeAvatar();
  };
  const avatarCategories = ["Avatars", "Flags", "Football", "NBA", "Others"];
  const [avatarCategory, setAvatarCategory] = useState("Avatars");
  const [subCategory, setSubCategory] = useState("");
  const [subSubCategory, setSubSubCategory] = useState("");
  // const [imageUpload, setShowImageUpload] = useState(false);
  // const toggleImageUpload = () => {
  //   setShowImageUpload(!imageUpload);
  // };

  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const userImageRef = useRef(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  return (
    <div className={classes["change-avatar"]}>
      {openCrop && (
        <Popup>
          <CropImage
            name={name}
            photoURL={photoURL}
            setOpenCrop={setOpenCrop}
            setPhotoURL={setPhotoURL}
            setFile={setFile}
            message={message}
            setMessage={setMessage}
            setSelectedAvatar={setSelectedAvatar}
          />
        </Popup>
      )}
      <div className={classes["change-avatars-first"]}>
        <input
          onChange={handleChange}
          type="file"
          className={classes["user-image"]}
          hidden
          ref={userImageRef}
        />
        <TopPart
          toggleChangeAvatar={toggleChangeAvatar}
          toggleImageUpload={() => {
            userImageRef.current.click();
          }}
        />
        <div className={classes["avatars-categories"]}>
          {avatarCategories.map((i, index) => (
            <div
              style={{
                backgroundColor: avatarCategory === i ? "#2195f1" : "#182228",
              }}
              key={index}
              onClick={() => {
                setSubCategory(null);
                setSubSubCategory(null);
                setAvatarCategory(i);
              }}
              className={classes["avatar-category"]}
            >
              {i}
            </div>
          ))}
        </div>
        <div className={classes["avatars"]}>
          {(avatarCategory && subCategory, subSubCategory)
            ? avatars[avatarCategory][subCategory][subSubCategory].map(
                (i, index) => (
                  <ImageWithLoading
                    avatarCategory={avatarCategory}
                    subCategory={subCategory}
                    subSubCategory={subSubCategory}
                    index={index}
                    newSelectedAvatar={newSelectedAvatar}
                    setNewSElectedAvatar={setNewSElectedAvatar}
                    key={index}
                  />
                )
              )
            : avatarCategory && subCategory
            ? Array.isArray(avatars[avatarCategory][subCategory])
              ? avatars[avatarCategory][subCategory].map((i, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setNewSElectedAvatar(
                        avatarCategory +
                          "/" +
                          subCategory +
                          "/" +
                          Number(index + 1)
                      );
                    }}
                    className={
                      newSelectedAvatar ==
                      avatarCategory +
                        "/" +
                        subCategory +
                        "/" +
                        Number(Number(index) + 1)
                        ? classes["clicked-avatar"]
                        : classes["avatar"]
                    }
                  >
                    {newSelectedAvatar ==
                      avatarCategory +
                        "/" +
                        subCategory +
                        "/" +
                        Number(Number(index) + 1) && (
                      <Image
                        className={classes["checked-icon"]}
                        src="/svg/chat/check.svg"
                        alt="avatar"
                        width="17"
                        height="17"
                      />
                    )}
                    <Image
                      className={classes["avatar-icon"]}
                      src={`/svg/chat/avatars/${avatarCategory}/${subCategory}/${
                        index + 1
                      }.svg`}
                      alt="avatar"
                      width="46"
                      height="46"
                    />
                  </div>
                ))
              : Object.keys(avatars[avatarCategory][subCategory]).map(
                  (i, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSubSubCategory(i);
                      }}
                      className={classes["sub-category"]}
                    >
                      <Image
                        src="svg/chat/change-avatar/folder-icon.svg"
                        alt="folder-icon"
                        width="54"
                        height="44"
                      />
                      <p>{i}</p>
                    </div>
                  )
                )
            : Array.isArray(avatars[avatarCategory])
            ? avatars[avatarCategory].map((i, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setNewSElectedAvatar(
                      avatarCategory + "/" + Number(Number(index) + 1)
                    );
                  }}
                  className={
                    newSelectedAvatar ==
                    avatarCategory + "/" + Number(Number(index) + 1)
                      ? classes["clicked-avatar"]
                      : classes["avatar"]
                  }
                >
                  {newSelectedAvatar ==
                    avatarCategory + "/" + Number(Number(index) + 1) && (
                    <Image
                      className={classes["checked-icon"]}
                      src="/svg/chat/check.svg"
                      alt="avatar"
                      width="17"
                      height="17"
                    />
                  )}
                  <Image
                    className={classes["avatar-icon"]}
                    src={`/svg/chat/avatars/${avatarCategory}/${index + 1}.svg`}
                    alt="avatar"
                    width="46"
                    height="46"
                  />
                </div>
              ))
            : Object.keys(avatars[avatarCategory]).map((i, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSubCategory(i);
                  }}
                  className={classes["sub-category"]}
                >
                  <Image
                    src="/svg/chat/change-avatar/folder-icon.svg"
                    alt="folder-icon"
                    width="54"
                    height="44"
                  />
                  <p>{i}</p>
                </div>
              ))}
        </div>

        <Actions
          applyChanges={applyChanges}
          toggleChangeAvatar={toggleChangeAvatar}
        />
      </div>
      <RightPart
        toggleChangeAvatar={toggleChangeAvatar}
        newSelectedAvatar={newSelectedAvatar}
        selectedAvatar={selectedAvatar}
      />
    </div>
  );
};
export default ChangeAvatar;
