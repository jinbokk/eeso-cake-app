import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Dropzone from "react-dropzone";
import axios from "axios";

export default function UploadProduct() {
  const [file, setFile] = useState();
  const [images, setImages] = useState([]);

  const { register, handleSubmit } = useForm();

  const dropHandler = (imageFiles) => {
    imageFiles.forEach((imageFile) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(imageFile);
    });

    setFile(imageFiles);
  };

  const deleteHandler = (item) => {
    const currentIndex = images.indexOf(item);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    setImages(newImages);
  };

  const onSubmit = (data, event) => {
    event.preventDefault();

    let formData = new FormData();

    formData.append("file", file[0]);
    formData.append("title", data.title);
    formData.append("ingredient", data.ingredient);
    formData.append("design", data.design);
    formData.append("description", data.description);
    formData.append("price", data.price);

    axios.post("/api/products", formData).then((res) => {
      if (res.status === 200) {
        alert("상품 업로드가 완료되었습니다.");
        console.log(res.data);
        // 이후 페이지 새로고침 하기
      } else {
        alert("상품 업로드에 실패하였습니다.");
        console.log(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            src={item}
            alt=""
            key={index}
            style={{ width: "100%", cursor: "pointer" }}
          />
        ))}
      </aside>
      <input {...register("title", {})} type="text" placeholder="title" />
      <input
        {...register("price", {})}
        type="number"
        placeholder="price"
        {...register}
      />
      <input {...register("ingredient")} type="radio" value="rice" />
      <input {...register("ingredient")} type="radio" value="bread" />
      <input {...register("ingredient")} type="radio" value="tart" />
      <input {...register("layer")} type="radio" value="1" />
      <input {...register("layer")} type="radio" value="2" />
      <input {...register("layer")} type="radio" value="3" />
      <select {...register("design")}>
        <option value="figure">figure</option>
        <option value="photo">photo</option>
        <option value="letter">letter</option>
      </select>
      <select {...register("special")}>
        <option value="money">money</option>
        <option value="topper">topper</option>
        <option value="3D">3D</option>
        <option value="fresh_flower">fresh_flower</option>
        <option value="bouquet">bouquet</option>
      </select>
      <input {...register("riceCakeDesign")} type="radio" value="dome" />
      <input {...register("riceCakeDesign")} type="radio" value="crescent" />
      <input {...register("riceCakeDesign")} type="radio" value="wreath" />
      <textarea {...register("description", {})} />
      <input type="submit" />
    </form>
  );
}
