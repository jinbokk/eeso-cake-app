import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const FileUpload = () => {
  const [images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();

    // const config = {
    //   header: { "content-type": "multipart/form-data" },
    // };

    formData.append("file", files[0]);

    // axios.post("/api/products/image", formData, config).then((res) => {
    axios.post("/api/products/image", formData).then((res) => {
      if (res.data.success) {
        console.log(res.data);

        setImages([...images, res.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패하였습니다");
      }
    });
  };

  const deleteHandler = (item) => {
    const currentIndex = images.indexOf(item);

    let newImages = [...images];
    newImages.splice(currentIndex, 1);

    setImages(newImages);
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
        {images.map((item, index) => (
          <img
            onClick={() => deleteHandler(item)}
            src={`http://localhost:5000/${item}`}
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
