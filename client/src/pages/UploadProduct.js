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

import "./css/uploadProduct.css";

export default function UploadProduct() {
  const { isAdmin } = useSelector((state) => state.user.authUserData);
  console.log(isAdmin);

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

  const layerHandler = (layer) => {
    setLayer(layer);
  };

  const ingredientHandler = (ingredient) => {
    setIngredient(ingredient);
  };

  const designHandler = (design) => {
    setDesign(design);
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
      return alert("????????? ?????? ?????? ??? ?????????");
    } else {
      let formData = new FormData();

      console.log(data);

      formData.append("file", file[0]);
      formData.append("title", data.title);
      formData.append("price", parseInt(data.price));
      formData.append("ingredient", data.ingredient);
      formData.append("layer", parseInt(data.layer));
      formData.append("design", data.design);
      formData.append("description", data.description);

      axios
        .post("/api/products/upload", formData)
        .then((res) => {
          if (res.status === 200) {
            alert("?????? ???????????? ?????????????????????.");
            // window.location.reload();
          } else {
            alert("?????? ???????????? ?????????????????????.");
          }
        })
        .catch((err) => {
          alert("?????? ???????????? ?????????????????????.");
          console.log(err.response.data.message.message);
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
                        label="?????????"
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
                        label="??????"
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">???</InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">???</InputAdornment>
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
                            onChange={(e) => {
                              onChange(e.target.value);
                              ingredientHandler(e);
                            }}
                            exclusive
                            {...field}
                          >
                            <ToggleButton value="rice">????????????</ToggleButton>
                            <ToggleButton value="bread">????????????</ToggleButton>
                            <ToggleButton value="tart">?????????</ToggleButton>
                            <ToggleButton value="event">
                              ????????? ?????????
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
                            onChange={(e) => {
                              onChange(e.target.value);
                              layerHandler(e);
                            }}
                            exclusive
                            {...field}
                          >
                            <ToggleButton value="1">1???</ToggleButton>
                            <ToggleButton value="2">2???</ToggleButton>
                            <ToggleButton value="3">3???</ToggleButton>
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
                              onChange={(e) => {
                                onChange(e.target.value);
                                designHandler(e);
                              }}
                              {...field}
                            >
                              <ToggleButton value="dome">??????</ToggleButton>
                              <ToggleButton value="crescent">
                                ????????????
                              </ToggleButton>
                              <ToggleButton value="wreath">?????????</ToggleButton>
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
                        onChange={(e) => {
                          onChange(e.target.value);
                          designHandler(e);
                        }}
                        {...field}
                      >
                        <ToggleButton value="figure">?????????</ToggleButton>
                        <ToggleButton value="photo">??????</ToggleButton>
                        <ToggleButton value="letter">?????????</ToggleButton>
                        <ToggleButton value="money">???</ToggleButton>
                        <ToggleButton value="topper">??????</ToggleButton>
                        <ToggleButton value="3D">3D</ToggleButton>
                        <ToggleButton value="fresh_flower">??????</ToggleButton>
                        <ToggleButton value="bouquet">?????????</ToggleButton>
                        <ToggleButton value="tiara">?????????</ToggleButton>
                        <ToggleButton value="party">??????</ToggleButton>
                        <ToggleButton value="snack">??????</ToggleButton>
                        <ToggleButton value="lotto">??????</ToggleButton>
                        <ToggleButton value="duck">???????????????</ToggleButton>
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
                      placeholder="?????????"
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
                    ?????? ?????????
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
