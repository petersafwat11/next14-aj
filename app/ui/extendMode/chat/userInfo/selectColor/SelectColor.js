import React, { useEffect, useState } from "react";
import classes from "./selectColor.module.css";
import { RgbaStringColorPicker } from "react-colorful";

const SelectColor = ({
  toggleUsernameColor,
  confirmUserNameColor,
  color,
  setColor,
}) => {
  return (
    <div className={classes["container"]}>
      <p className={classes["username text"]}>Username colour </p>
      <div className="color-picker-wrapper">
      <RgbaStringColorPicker color={color} onChange={setColor} />

      </div>
      <div className={classes["colors-selectors"]}>
        {[
          "rgba(96, 145, 255, 1)",
          "rgba(105, 254, 255, 1)",
          "rgba(127, 255, 111, 1)",
          "rgba(191, 75, 38, 1)",
          "rgba(244, 49, 53, 1)",
          "rgba(199, 55, 96, 1)",
          "rgba(150, 41, 212, 1)",
        ].map((colorItem, index) => (
          <span
            key={index}
            onClick={() => {
              setColor(colorItem);
            }}
            style={{ backgroundColor: colorItem }}
            className={classes["color-selector"]}
          ></span>
        ))}
      </div>

      <div className={classes["user-info-actions"]}>
        <button
          onClick={confirmUserNameColor}
          className={classes["confirm-button"]}
        >
          Confirm{" "}
        </button>
        <button
          onClick={toggleUsernameColor}
          className={classes["cancel-button"]}
        >
          cancel{" "}
        </button>
      </div>
    </div>
  );
};

export default SelectColor;

// import React from "react";
// import { ChromePicker } from "react-color";

// class ButtonExample extends React.Component {
//   handleClose = () => {
//     this.setState({ displayColorPicker: false });
//   };

//   render() {
//     const popover = {
//       position: "absolute",
//       zIndex: "2",
//     };
//     const cover = {
//       position: "fixed",
//       top: "0px",
//       right: "0px",
//       bottom: "0px",
//       left: "0px",
//     };
//     return (
//       <div>
//         <div style={popover}>
//           <div style={cover} onClick={this.handleClose} />
//           <ChromePicker />
//         </div>
//       </div>
//     );
//   }
// }

// export default ButtonExample;
