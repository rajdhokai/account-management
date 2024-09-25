import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  Button,
  Container,
  Form,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";

const Home = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate(); // Used for navigation

  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserData(storedUser);
    } else {
      // Redirect to login page if no user is found
      navigate("/signin");
    }
  }, [navigate]);

  // Handle input changes for username and email
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  // Handle form submission to save the updated data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save updated user data to localStorage
    localStorage.setItem("user", JSON.stringify(userData));

    // Show success alert
    Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your username and email have been updated successfully!",
      confirmButtonText: "OK",
    });

    // Exit edit mode after saving
    setIsEditing(false);
  };

  // Function to handle edit mode confirmation
  const handleEditClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to edit your profile details?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, edit it!",
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsEditing(true);
        Swal.fire("Edit Mode", "You can now edit your details.", "success");
      }
    });
  };

  return (
    <>
      <Container className="d-flex flex-column w-100">
        <Header />
        <h2 className="mb-4">Welcome, {userData.username}!</h2>
        <Row>
          <Col col="12" md="6">
            <img
              src="https://img.freepik.com/free-vector/designer-girl-concept-illustration_114360-2090.jpg?t=st=1727284414~exp=1727288014~hmac=f6aadc615db43482dcf3ff6bee6cc0bf9eb8c59a7f9e48aea2a7c57eea5d4249&w=740"
              className="img-fluid"
              alt="Sample image"
            />
          </Col>
          <Col>
            <Form onSubmit={handleSubmit}>
              {/* Username Field */}
              <FloatingLabel
                controlId="floatingUsername"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Enter your username"
                />
              </FloatingLabel>

              {/* Email Field */}
              <FloatingLabel
                controlId="floatingEmail"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="name@example.com"
                />
              </FloatingLabel>

              {/* Edit and Save Buttons */}
              {isEditing ? (
                <Button type="submit" variant="primary" className="me-2">
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="outline-secondary"
                  className="me-2"
                  onClick={handleEditClick}
                >
                  Edit Profile
                </Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
