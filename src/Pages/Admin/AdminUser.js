import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import UserService from "../../services/UserService";
import AuthService from "../../services/AuthService";
import "./AdminUser.css";
const AdminCompany = (props) => {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();
  const userService = new UserService();
  const authService = new AuthService();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...userData, [name]: value };
    setuserData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await authService.getUser();
    if (response.status === 200) {
      const userResponse = await userService.updateUserName(userData.name);
      if (userResponse.status === 200) {
        props.alert("success", "User sucessfully updated!");
        //navigate("/admin/home");
      } else {
        props.alert(
          "danger",
          "Please remove company's products before deleting"
        );
      }
    } else {
      //navigate("/");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await authService.getUser();
      if (response.status === 200) {
        const data = await response.json();
        setuserData(data);
      } else {
        navigate("/");
      }
    };

    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <div>Welcome {userData.name}</div>
          <div>
            <button>
              <i className="bi bi-save"></i> Save
            </button>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={userData.name}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Email:</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={userData.email}
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCompany;
