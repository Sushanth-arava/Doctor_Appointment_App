import { Button, Form, Input } from "antd";
import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/reducers/alertsSlice";

function Register() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title">Signup Here</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Name is required" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Enter valid email",
                pattern: new RegExp(
                  "^[a-zA-Z0-9._%+-]+@(gmail.com|yahoo.com)$"
                ),
              },
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please add a password" },
              { min: 8, message: "Password must have a minimum length of 8" },
              {
                pattern: new RegExp(
                  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                ),
                message:
                  "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
              },
            ]}
          >
            <Input
              placeholder="Password"
              type={passwordVisible ? "text" : "password"}
            />
          </Form.Item>
          <Button
            onClick={togglePasswordVisibility}
            className="border border-info"
          >
            {passwordVisible ? "Hide " : "Show "}Password
          </Button>

          <Button
            className="primary-button my-2 full-width-button"
            htmlType="submit"
          >
            REGISTER
          </Button>

          <Link to="/login" className="anchor mt-2">
            CLICK HERE TO LOGIN
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
