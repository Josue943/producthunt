import React, { useState, useContext, useEffect } from "react";
import Layout from "../components/layout/Layout";
import FormControl from "../components/ui/FormControl";
import { Error, Form, InputSubmit } from "../components/ui/Form";
import Spinner from "../components/ui/Spinner";
import { productValidation } from "../components/validation/validation";
import useForm from "../components/hooks/useForm";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import { FirebaseContext } from "../firebase/index";
import FileUploader from "react-firebase-file-uploader";
import { useRouter } from "next/router";
import Error404 from "../components/layout/404";

const NewProduct = () => {
  const initialState = {
    name: "",
    company: "",
    image: "",
    url: "",
    description: ""
  };
  const { user, firebase } = useContext(FirebaseContext);
  const [error, setError] = useState("");
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  /** */
  //state requerido para la imagen
  const [nameImage, setNameImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [urlImage, setUrlImage] = useState("");

  const onSubmit = () => {
    //creamos el producto
    const product = {
      name,
      company,
      url,
      description,
      urlImage,
      votes: 0,
      comments: [],
      created: Date.now(),
      //guardar info del user
      creator: {
        id: user.uid,
        name: user.displayName
      },
      voted: []
    };
    //asi agregamos
    firebase.db.collection("products").add(product);
    //redireccionamos
    return router.push("/");
  };
  /* subida de la imagen se copio de la pagina*/

  const handleUploadStart = () => {
    setProgress(0);
    setLoading(true);
  };

  const handleProgress = progress => {
    setProgress({ progress });
  };

  const handleUploadError = error => {
    setLoading(error);
    console.log(error);
  };

  const handleUploadSuccess = filename => {
    setProgress(100);
    setLoading(false);
    setNameImage(filename);
    firebase.storage
      .ref("products")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        setUrlImage(url);
      });
  };
  const { values, errors, handleChange, handleSubmit } = useForm(
    initialState,
    productValidation,
    onSubmit
  );

  const { name, company, image, url, description } = values;

  return (
    <Layout>
      {!user ? (
        <Error404 message="Not Found" />
      ) : (
        <>
          <Form onSubmit={handleSubmit}>
            <h1>New Product</h1>
            {error && <Error>{error}</Error>}
            <fieldset
              css={css`
                padding: 10px;
              `}
            >
              <legend>General Information</legend>

              <FormControl
                name="name"
                Label="Name"
                onChange={handleChange}
                placeholder="Your Name"
                value={name}
              />
              {errors.name && <Error>{errors.name}</Error>}
              <FormControl
                name="company"
                Label="company"
                onChange={handleChange}
                placeholder="Your Company"
                value={company}
              />
              {errors.company && <Error>{errors.company}</Error>}
              <TextAreaContainer>
                <label htmlFor="image">Image</label>
                {/*  alguna de la validacion viene con este  modulo */}
                <FileUploader
                  accept="image/*"
                  name="image"
                  randomizeFilename
                  storageRef={firebase.storage.ref("products")}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </TextAreaContainer>
              {errors.image && <Error>{errors.image}</Error>}
              <FormControl
                name="url"
                Label="url"
                onChange={handleChange}
                placeholder="Url"
                value={url}
              />
              {errors.url && <Error>{errors.url}</Error>}
            </fieldset>

            <fieldset
              css={css`
                padding: 10px;
                margin-top: 5px;
                margin-bottom: 8px;
              `}
            >
              <legend>About the Product</legend>

              <TextAreaContainer>
                <label>Description</label>
                <textarea
                  name="description"
                  onChange={handleChange}
                  placeholder="description"
                  value={description}
                />
              </TextAreaContainer>
              {errors.description && <Error>{errors.description}</Error>}
            </fieldset>
            <InputSubmit type="submit" value="Add Product" />
          </Form>
          {spinner && <Spinner />}
        </>
      )}
    </Layout>
  );
};

export default NewProduct;

const TextAreaContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 15px;
  label {
    flex-basis: 150px;
  }
  textarea {
    flex: 1;
    padding: 5px;
  }
`;
