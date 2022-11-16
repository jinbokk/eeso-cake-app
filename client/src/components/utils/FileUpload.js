import { height } from "@mui/system";
import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

const FileUpload = () => {
  const dropHandler = (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("files", files[0]);

    axios.post("/api/product/image", formData, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        alert("파일을 저장하는데 실패하였습니다");
      }
    });
  };

  return (
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
  );
};

export default FileUpload;
