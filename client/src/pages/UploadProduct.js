import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../components/utils/FileUpload";

import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

export default function UploadProduct() {
  const [images, setImages] = useState([]);

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();

    console.log(data);

    const body = {
      title: data.상품명,
      ingredient: data.종류,
      layer: data.층수,
      design: data.카테고리,
      image: data.이미지,
      image_url: data.이미지주소,
      description: data.상세정보,
      price: data.가격,
      sold: data.판매여부,
      views: data.조회수,
    };

    console.log(body);

    // axios.post("/api/products", body).then((res) => {
    //   if (res.data.success) {
    //     alert("상품 업로드가 완료되었습니다.");
    //   } else {
    //     alert("상품 업로드에 실패하였습니다.");
    //   }
    // });
  };

  // console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FileUpload refreshFunction={updateImages} />
      <input type="text" placeholder="상품명" {...register("상품명", {})} />
      <input type="undefined" placeholder="가격" {...register} />
      <input {...register("종류")} type="radio" value="떡케이크" />
      <input {...register("종류")} type="radio" value="빵케이크" />
      <input {...register("종류")} type="radio" value="타르트" />
      <input {...register("층 수")} type="radio" value="1층" />
      <input {...register("층 수")} type="radio" value="2층" />
      <input {...register("층 수")} type="radio" value="3층" />
      <select {...register("카테고리")}>
        <option value="피규어">피규어</option>
        <option value="포토">포토</option>
        <option value="레터링">레터링</option>
      </select>
      <select {...register("특수 디자인")}>
        <option value="돈">돈</option>
        <option value="토퍼">토퍼</option>
        <option value="3D">3D</option>
        <option value="생화">생화</option>
        <option value="부케">부케</option>
      </select>
      <input {...register("떡케이크 디자인")} type="radio" value="돔형" />
      <input {...register("떡케이크 디자인")} type="radio" value="초승달형" />
      <input {...register("떡케이크 디자인")} type="radio" value="리스형" />
      <textarea {...register("상세 정보", {})} />
      <input type="submit" />
    </form>
  );
}

// const UploadProduct = () => {
//   const [title, setTitle] = useState("");
//   const [ingredient, setIngredient] = useState("");
//   const [layer, setLayer] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [images, setImages] = useState([]);

//   const titleHandler = (e) => {
//     setTitle(e.target.value);
//   };

//   const priceHandler = (e) => {
//     setPrice(e.target.value);
//   };

//   const ingredientHandler = (e) => {
//     setIngredient(e.target.value);
//   };

//   const layerHandler = (e) => {
//     setLayer(e.target.value);
//   };

//   const descriptionHandler = (e) => {
//     setDescription(e.target.value);
//   };

//   const updateImages = (newImages) => {
//     setImages(newImages);
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();

//     const body = {
//       title: { type: String, required: true },
//       ingredient: { type: String, required: true },
//       layer: { type: Number, required: true },
//       design: { type: Array, default: [], required: true },
//       image: { type: Array, default: [] },
//       image_url: { type: String, required: true },
//       description: { type: String },
//       price: { type: Number, default: 0 },
//       sold: { type: Number, default: 0 },
//       views: { type: Number, default: 0 },
//     };

//     axios.post("/api/products", body).then((res) => {
//       if (res.data.success) {
//         alert("상품 업로드가 완료되었습니다.");
//       } else {
//         alert("상품 업로드에 실패하였습니다.");
//       }
//     });
//   };

//   return (
//     <form onSubmit={submitHandler}>
//       <Container>
//         <Row>
//           <Col className="d-flex justify-content-center align-items-center">
//             <label>image</label>
//             <FileUpload refreshFunction={updateImages} />
//           </Col>

//           <Col className="d-flex justify-content-center align-items-center">
//             <div className="mb-3">
//               <div className="text-center">
//                 <label>Title</label>
//               </div>
//               <div>
//                 <input onChange={titleHandler} value={title} />
//               </div>
//             </div>

//             <div className="mb-3">
//               <div className="text-center">
//                 <label>Price</label>
//               </div>
//               <div>
//                 <input type="number" onChange={priceHandler} value={price} />
//               </div>
//             </div>

//             <div className="mb-3">
//               <div className="text-center">
//                 <label>ingredient</label>
//               </div>
//               <div>
//                 <input
//                   type="radio"
//                   name="ingredient"
//                   value="rice"
//                   onChange={ingredientHandler}
//                 />
//                 <span className="mx-2">Rice</span>
//                 <input
//                   type="radio"
//                   name="ingredient"
//                   value="bread"
//                   onChange={ingredientHandler}
//                 />
//                 <span className="mx-2">Bread</span>
//                 <input
//                   type="radio"
//                   name="ingredient"
//                   value="tart"
//                   onChange={ingredientHandler}
//                 />
//                 <span className="mx-2">Tart</span>
//               </div>
//             </div>

//             <div className="mb-3">
//               <div className="text-center">
//                 <label>layer</label>
//               </div>
//               <div>
//                 <input
//                   type="radio"
//                   name="layer"
//                   value="1"
//                   onChange={layerHandler}
//                 />
//                 <span className="mx-2">1</span>
//                 <input
//                   type="radio"
//                   name="layer"
//                   value="2"
//                   onChange={layerHandler}
//                 />
//                 <span className="mx-2">2</span>
//                 <input
//                   type="radio"
//                   name="layer"
//                   value="3"
//                   onChange={layerHandler}
//                 />
//                 <span className="mx-2">3</span>
//               </div>
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col className="d-flex justify-content-center align-items-center">
//             <div className="mb-3">
//               <div className="text-center">category</div>
//               <input type="checkbox" name="design" value="figure" />
//               <span className="mx-2">figure</span>
//               <input type="checkbox" name="design" value="photo" />
//               <span className="mx-2">photo</span>
//               <input type="checkbox" name="design" value="letter" />
//               <span className="mx-2">letter</span>
//             </div>

//             <div className="mb-3">
//               <div className="text-center">special</div>
//               <input type="checkbox" name="design" value="money" />
//               <span className="mx-2">money</span>
//               <input type="checkbox" name="design" value="topper" />
//               <span className="mx-2">topper</span>
//               <input type="checkbox" name="design" value="3D" />
//               <span className="mx-2">3D</span>
//               <input type="checkbox" name="design" value="fresh_flower" />
//               <span className="mx-2">fresh_flower</span>
//               <input type="checkbox" name="design" value="bouquet" />
//               <span className="mx-2">bouquet</span>
//             </div>

//             <div className="mb-3">
//               <div className="text-center">rice cake design</div>
//               <input type="radio" name="design" value="dome" />
//               <span className="mx-2">dome</span>
//               <input type="radio" name="design" value="crescent" />
//               <span className="mx-2">crescent</span>
//               <input type="radio" name="design" value="wreath" />
//               <span className="mx-2">wreath</span>
//             </div>
//           </Col>

//           <Col className="justify-content-center align-items-center">
//             <label className="text-center">description</label>
//             <textarea
//               name="description"
//               rows="10"
//               cols="40"
//               onChange={descriptionHandler}
//               value={description}
//             ></textarea>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <button type="submit">Submit</button>
//           </Col>
//         </Row>
//       </Container>
//     </form>
//   );
// };

// export default UploadProduct;
