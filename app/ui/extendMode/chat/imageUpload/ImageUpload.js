// import React, { useState } from 'react';
// import Dropzone from 'react-dropzone';

// function ImageUploader() {
//   const [image, setImage] = useState(null);

//   const handleDrop = acceptedFiles => {
//     const file = acceptedFiles[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       setImage(reader.result);
//     };

//     reader.readAsDataURL(file);
//   };

//   return (
//     <Dropzone onDrop={handleDrop}>
//       {({ getRootProps, getInputProps }) => (
//         <div {...getRootProps()}>
//           <input {...getInputProps()} />
//           {image ? (
//             <img src={image} alt="uploaded" />
//           ) : (
//             <p>Drag and drop your image here, or click to select an image.</p>
//           )}
//         </div>
//       )}
//     </Dropzone>
//   );
// }

// export default ImageUploader;
import React from "react";

const ImageUpload = () => {
  return <div>ImageUpload</div>;
};

export default ImageUpload;
