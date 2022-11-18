import React, { useState } from "react";
import FileUpload from "../components/utils/FileUpload";

import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const UploadProduct = () => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const body = {
      title: { type: String, required: true },
      ingredient: { type: String, required: true },
      layer: { type: Number, required: true },
      design: { type: Array, default: [], required: true },
      image: { type: Array, default: [] },
      image_url: { type: String, required: true },
      description: { type: String },
      price: { type: Number, default: 0 },
      sold: { type: Number, default: 0 },
      views: { type: Number, default: 0 },
    };

    axios.post("/api/products", body);
  };

  return (
    <Form onSubmit={submitHandler}>
      <Container>
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <label>image</label>
            <FileUpload refreshFunction={updateImages} />
          </Col>

          <Col className="d-flex justify-content-center align-items-center">
            <div className="mb-3">
              <div className="text-center">
                <label>Title</label>
              </div>
              <div>
                <input onChange={titleHandler} value={title} />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-center">
                <label>Price</label>
              </div>
              <div>
                <input type="number" onChange={priceHandler} value={price} />
              </div>
            </div>

            <div className="mb-3">
              <div className="text-center">
                <label>ingredient</label>
              </div>
              <div>
                <input type="radio" name="ingredient" value="rice" />
                <span className="mx-2">Rice</span>
                <input type="radio" name="ingredient" value="bread" />
                <span className="mx-2">Bread</span>
                <input type="radio" name="ingredient" value="tart" />
                <span className="mx-2">Tart</span>
              </div>
            </div>

            <div className="mb-3">
              <div className="text-center">
                <label>layer</label>
              </div>
              <div>
                <input type="radio" name="layer" value="1" />
                <span className="mx-2">1</span>
                <input type="radio" name="layer" value="2" />
                <span className="mx-2">2</span>
                <input type="radio" name="layer" value="3" />
                <span className="mx-2">3</span>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <div className="mb-3">
              <div className="text-center">category</div>
              <input type="checkbox" name="design" value="figure" />
              <span className="mx-2">figure</span>
              <input type="checkbox" name="design" value="photo" />
              <span className="mx-2">photo</span>
              <input type="checkbox" name="design" value="letter" />
              <span className="mx-2">letter</span>
            </div>

            <div className="mb-3">
              <div className="text-center">special</div>
              <input type="checkbox" name="design" value="money" />
              <span className="mx-2">money</span>
              <input type="checkbox" name="design" value="topper" />
              <span className="mx-2">topper</span>
              <input type="checkbox" name="design" value="3D" />
              <span className="mx-2">3D</span>
              <input type="checkbox" name="design" value="fresh_flower" />
              <span className="mx-2">fresh_flower</span>
              <input type="checkbox" name="design" value="bouquet" />
              <span className="mx-2">bouquet</span>
            </div>

            <div className="mb-3">
              <div className="text-center">rice cake design</div>
              <input type="radio" name="design" value="dome" />
              <span className="mx-2">dome</span>
              <input type="radio" name="design" value="crescent" />
              <span className="mx-2">crescent</span>
              <input type="radio" name="design" value="wreath" />
              <span className="mx-2">wreath</span>
            </div>
          </Col>

          <Col className="justify-content-center align-items-center">
            <label className="text-center">description</label>
            <textarea
              name="description"
              rows="10"
              cols="40"
              onChange={descriptionHandler}
              value={description}
            ></textarea>
          </Col>
        </Row>
        <Row>
          <Col>
            <button>Submit</button>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default UploadProduct;
