"use client";
import { Form, Input, Button, message } from "antd";
import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";

interface User {
  email: string;
  name: string;
}

const Register: React.FC = () => {
  const [passType, setType] = useState<"password" | "text">("password");
  const [icon, setIcon] = useState<typeof eyeOff>(eyeOff);
  const [form] = Form.useForm();

  const passwordToggle = () => {
    setType((prev) => (prev === "password" ? "text" : "password"));
    setIcon((prev) => (prev === eyeOff ? eye : eyeOff));
  };

  const registerWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;

      try {
        const response = await axios.get<User>(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(accessToken);

        const { email, name } = response.data;
        console.log("User info:", { email, name });
      } catch (error) {
        console.error("Error fetching user info:", error);
        message.error("Failed to fetch user information.");
      }
    },
    onError: () => {
      message.error("Login Failed");
    },
    scope: "https://www.googleapis.com/auth/calendar",
  });

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await axios.post<{ success: boolean; message: string }>(
        "/api/admin/register",
        values
      );
      if (response.data.success) {
        message.success(response.data.message);
        // Redirect to login or another page
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center bg-gray-900 h-screen items-center">
      <div className="w-96 flex gap-5 flex-col shadow border rounded-2xl border-gray-500 p-5 bg-gray-200">
        <h1 className="text-black font-bold text-center text-2xl">Login</h1>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <div className="flex relative">
              <Input.Password
                type={passType}
                placeholder="Enter your password"
                iconRender={(visible) => (
                  <Icon
                    icon={visible ? eye : eyeOff}
                    onClick={passwordToggle}
                  />
                )}
              />
            </div>
          </Form.Item>
          <div className="flex justify-end w-full pt-8">
            <Button
              onClick={registerWithGoogle}
              className="m-2 w-full"
              type="primary"
            >
              Sign in with Google
            </Button>
            <Button type="primary" className="m-2 w-full" htmlType="submit">
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
