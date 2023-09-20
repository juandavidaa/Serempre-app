import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

import "./Login.css";

import AuthService from "../services/AuthService";

function Login(props) {
  const authService = new AuthService();

  const navigate = useNavigate();

  const [datosLogin, setDatosLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChangeLogin = (e) => {
    const { name, value } = e.target;
    const newData = { ...datosLogin, [name]: value };
    setDatosLogin(newData);
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    props.close();
    const data = await authService.login(datosLogin);
    let response;
    if (data.status !== 200) {
      response = await data.json();
      props.alert("danger", response[Object.keys(response)[0]]);
    } else {
      response = await data.json();

      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("token_type", response.token_type);
      localStorage.setItem("expires_in", response.expires_in);

      navigate("admin/home");
    }
  };

  return (
    <MDBContainer className="main-container">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://www.drupal.org/files/styles/grid-3-2x/public/serempre-logomark-color%20%282%29.png?itok=YQQSUwXt"
              alt="login form"
              className="rounded-start login-image"
            />
          </MDBCol>
          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex flex-row mt-2">
                <span className="h1 fw-bold mb-5 logo">Serempre App</span>
              </div>
              <div>
                <form onSubmit={handleSubmitLogin}>
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Email"
                    name="email"
                    type="email"
                    size="lg"
                    onChange={(e) => handleInputChangeLogin(e)}
                  />
                  <MDBInput
                    wrapperClass="mb-3"
                    label="Password"
                    name="password"
                    type="password"
                    size="lg"
                    onChange={(e) => handleInputChangeLogin(e)}
                  />

                  <MDBBtn
                    type="submit"
                    className="mb-4 w-100"
                    color="dark"
                    size="lg"
                  >
                    Login
                  </MDBBtn>
                </form>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
