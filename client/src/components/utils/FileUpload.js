import React from "react";
import Dropzone from "react-dropzone";

const FileUpload = (props) => {
  const dropHandler = (files) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        props.setImages((prev) => [
          ...prev,
          reader.result,
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const deleteHandler = (item) => {
    const currentIndex = props.images.indexOf(item);
    let newImages = [...props.images];
    newImages.splice(currentIndex, 1);
    props.setImages(newImages);
  };

  return (
    <>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              style={{
                width: "400px",
                height: "400px",
                backgroundColor: "white",
                border: "1px solid lightgray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p style={{ fontSize: "5rem" }}>+</p>
            </div>
          </section>
        )}
      </Dropzone>

      <aside
        style={{
          display: "flex",
          width: "350px",
          height: "350px",
          overflow: "auto",
        }}
      >
        {props.images.map((item, index) => (
          <img
            onClick={() => deleteHandler(item)}
            src={item}
            alt=""
            key={index}
            style={{ width: "100%", cursor: "pointer" }}
          />
        ))}
      </aside>
    </>
  );
};

export default FileUpload;
