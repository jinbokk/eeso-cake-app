import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { motion } from "framer-motion";

import {
  Button,
  TextareaAutosize,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { pink } from "@mui/material/colors";

import Dropzone from "react-dropzone";
import axios from "axios";

import "./css/uploadProductPage.css";

export default function UploadProductPage() {
  const { isAdmin } = useSelector((state) => state.user.authUserData);

  const theme = createTheme({
    palette: {
      primary: {
        main: pink[300],
      },
      secondary: {
        main: pink[500],
      },
    },
  });

  const [layer, setLayer] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [design, setDesign] = useState([]);

  const layerHandler = (event, value) => {
    setLayer(value);
  };

  const ingredientHandler = (event, value) => {
    setIngredient(value);
  };

  const designHandler = (event, value) => {
    setDesign(value);
  };

  useEffect(() => {
    setDesign([]);
  }, [ingredient]);

  const { handleSubmit, control } = useForm();

  const preventEnterEvent = (e) => {
    if (e.target.name === "description") {
      return;
    } else {
      if (e.key === "Enter") return e.preventDefault();
    }
  };

  const [file, setFile] = useState(undefined);
  const [images, setImages] = useState([]);

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
    if (file === undefined || data.ingredient === undefined) {
      return alert("양식을 다시 확인 해 주세요");
    } else {
      let formData = new FormData();

      console.log(data);

      formData.append("file", file[0]);
      formData.append("title", data.title);
      formData.append("price", data.price && parseInt(data.price));
      formData.append("ingredient", data.ingredient);
      formData.append("layer", data.layer && parseInt(data.layer));
      formData.append("design", data.design);
      formData.append("description", data.description);

      console.log("final form:::", formData);

      axios
        .post("/api/products/upload", formData)
        .then((res) => {
          if (res.status === 200) {
            // alert("상품 업로드가 완료되었습니다.");
            window.location.reload();
          } else {
            alert("상품 업로드에 실패하였습니다.");
          }
        })
        .catch((error) => {
          alert("상품 업로드에 실패하였습니다.");
          console.log(error.response.data.message.message);
        });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "20px" }}
      animate={{ opacity: 1, y: 0 }}
      // exit={{ opacity: 0 }}
    >
      {!isAdmin ? null : (
        <Container className="py-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => preventEnterEvent(e)}
          >
            <Dropzone onDrop={dropHandler}>
              {({ getRootProps, getInputProps }) => (
                <section className="image_uploader">
                  <div className="upload_image" {...getRootProps()}>
                    <input {...getInputProps()} />
                    <div style={{ fontSize: "5rem" }}>+</div>
                  </div>
                  <aside className="preview_image_container">
                    {images.map((item, index) => (
                      <img
                        onClick={() => deleteHandler(item)}
                        src={item}
                        alt=""
                        key={index}
                        className="preview_image"
                      />
                    ))}
                  </aside>
                </section>
              )}
            </Dropzone>

            <ThemeProvider theme={theme}>
              <Row className="mb-5">
                <Col lg={4}>
                  <Controller
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <TextField
                        id="outlined-basic"
                        label="상품명"
                        variant="outlined"
                        style={{ width: "100%" }}
                        className="my-4"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="price"
                    render={({ field }) => (
                      <TextField
                        id="outlined-basic"
                        label="가격"
                        variant="outlined"
                        InputProps={{
                          // startAdornment: (
                          //   <InputAdornment position="start">원</InputAdornment>
                          // ),
                          endAdornment: (
                            <InputAdornment position="end">원</InputAdornment>
                          ),
                        }}
                        style={{ width: "100%" }}
                        {...field}
                      />
                    )}
                  />
                </Col>

                <Col lg={8}>
                  <Row>
                    <Col>
                      <Controller
                        control={control}
                        name="ingredient"
                        render={({ field: { onChange, value, ...field } }) => (
                          <ToggleButtonGroup
                            color="secondary"
                            className="my-4"
                            size="large"
                            value={ingredient}
                            onChange={(event, value) => {
                              onChange(value);
                              ingredientHandler(event, value);
                            }}
                            exclusive
                            {...field}
                          >
                            <ToggleButton value="rice">떡케이크</ToggleButton>
                            <ToggleButton value="bread">빵케이크</ToggleButton>
                            <ToggleButton value="tart">타르트</ToggleButton>
                            <ToggleButton value="season">
                              시즌 케이크
                            </ToggleButton>
                          </ToggleButtonGroup>
                        )}
                      />
                    </Col>
                    <Col>
                      <Controller
                        control={control}
                        name="layer"
                        render={({ field: { onChange, value, ...field } }) => (
                          <ToggleButtonGroup
                            color="secondary"
                            className="my-4"
                            size="large"
                            value={layer}
                            onChange={(event, value) => {
                              onChange(value);
                              layerHandler(event, value);
                            }}
                            exclusive
                            {...field}
                          >
                            <ToggleButton value="1">1층</ToggleButton>
                            <ToggleButton value="2">2층</ToggleButton>
                            <ToggleButton value="3">3층</ToggleButton>
                          </ToggleButtonGroup>
                        )}
                      />
                    </Col>
                  </Row>

                  {ingredient === "rice" ? (
                    <>
                      <Row>
                        <Controller
                          control={control}
                          name="design"
                          render={({
                            field: { onChange, value, ...field },
                          }) => (
                            <ToggleButtonGroup
                              color="secondary"
                              className="mb-4"
                              size="large"
                              value={design}
                              onChange={(event, value) => {
                                onChange(value);
                                designHandler(event, value);
                              }}
                              {...field}
                            >
                              <ToggleButton value="dome">돔형</ToggleButton>
                              <ToggleButton value="crescent">
                                초승달형
                              </ToggleButton>
                              <ToggleButton value="wreath">리스형</ToggleButton>
                            </ToggleButtonGroup>
                          )}
                        />
                      </Row>
                    </>
                  ) : null}

                  <Controller
                    name="design"
                    control={control}
                    render={({ field: { onChange, value, ...field } }) => (
                      <ToggleButtonGroup
                        color="secondary"
                        className="d-flex flex-wrap"
                        size="large"
                        value={design}
                        onChange={(event, value) => {
                          onChange(value);
                          designHandler(event, value);
                        }}
                        {...field}
                      >
                        <ToggleButton value="figure">피규어</ToggleButton>
                        <ToggleButton value="photo">포토</ToggleButton>
                        <ToggleButton value="letter">레터링</ToggleButton>
                        <ToggleButton value="money">돈</ToggleButton>
                        <ToggleButton value="topper">토퍼</ToggleButton>
                        <ToggleButton value="square">사각형</ToggleButton>
                        <ToggleButton value="heart">하트형</ToggleButton>
                        <ToggleButton value="3D">3D</ToggleButton>
                        <ToggleButton value="fresh_flower">생화</ToggleButton>
                        <ToggleButton value="bouquet">꽃다발</ToggleButton>
                        <ToggleButton value="tiara">티아라</ToggleButton>
                        <ToggleButton value="party">파티</ToggleButton>
                        <ToggleButton value="snack">과자</ToggleButton>
                        <ToggleButton value="lotto">로또</ToggleButton>
                        <ToggleButton value="duck">오리삼형제</ToggleButton>
                      </ToggleButtonGroup>
                    )}
                  />
                </Col>
              </Row>

              <Row className="mb-5 px-3">
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextareaAutosize
                      className="description_box"
                      minRows={3}
                      placeholder="설명글"
                      {...field}
                    />
                  )}
                />
              </Row>

              <Row>
                <Col>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ height: "50px" }}
                  >
                    상품 업로드
                  </Button>
                </Col>
              </Row>
            </ThemeProvider>
          </form>
        </Container>
      )}
    </motion.div>
  );
}
