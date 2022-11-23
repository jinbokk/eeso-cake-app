import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../components/utils/FileUpload";

import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

export default function UploadProduct() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    console.log("OH, images : ", images);
  }, [images]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();

    const body = {
      title: data.title,
      ingredient: data.ingredient,
      layer: Number(data.layer),
      design: data.design,
      image: images[0],
      // image_url: data.이미지주소,
      description: data.description,
      price: Number(data.price),
      // sold: Number(0),
      // views: Number(0),
    };

    // console.log(body);

    axios.post("/api/products", body).then((res) => {
      if (res.data.success) {
        alert("상품 업로드가 완료되었습니다.");
      } else {
        alert("상품 업로드에 실패하였습니다.");
      }
    });
  };

  // alert("form error : ", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileUpload images={images} setImages={setImages} />
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
