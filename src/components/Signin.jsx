import React from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";

const Signin = () => {
  const navigate = useNavigate();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Retrieve stored user data from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      // Check if the email and password match the stored user data
      if (
        storedUser &&
        storedUser.email === values.email &&
        storedUser.password === values.password
      ) {
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "You have successfully signed in!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password. Please try again.",
          confirmButtonText: "OK",
        });
      }
    },
  });

  return (
    <>
      <Container className="p-3 my-5 d-flex flex-column w-100">
        <Row>
          <Col col="12" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Signin image"
            />
          </Col>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              {/* Email */}
              <FloatingLabel
                controlId="floatingInputEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={formik.touched.email && !!formik.errors.email}
                  isValid={formik.touched.email && !formik.errors.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                ) : null}
              </FloatingLabel>

              {/* Password */}
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isInvalid={
                    formik.touched.password && !!formik.errors.password
                  }
                  isValid={formik.touched.password && !formik.errors.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                ) : null}
              </FloatingLabel>

              <div className="d-grid gap-2">
                <Button type="submit" variant="outline-primary" size="md">
                  Sign In
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-2">
                  Don't have an account?{" "}
                  <Link to="/signup" className="link-danger">
                    Signup
                  </Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Signin;
