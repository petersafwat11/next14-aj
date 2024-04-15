import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

function ImageCropper({ image }) {
  const editorRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage().toDataURL();
      setPreview(canvas);
    }
  };

  return (
    <div>
      <AvatarEditor
        ref={editorRef}
        image={image}
        width={250}
        height={250}
        border={50}
        borderRadius={125}
        color={[255, 255, 255, 0.6]}
        scale={1}
      />
      <button onClick={handleSave}>Save Image</button>
      {preview && <img src={preview} alt="cropped" />}
    </div>
  );
}

export default ImageCropper;