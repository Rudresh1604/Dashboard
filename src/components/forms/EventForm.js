"use client";

import Lottie from "lottie-react";
import React, { useState } from "react";
import { message, Form } from "antd";
import axios from "axios";
import RegisterAnimi from "../../lib/RegisterData.json";

function EventForm() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // Submit form handler
  const submitForm = async (values) => {
    let site;
    console.log(file);
    const formData = new FormData();
    formData.append("reciept", file);
    // Append other form values
    Object.keys(values).forEach((key) => {
      if (key !== "reciept") {
        formData.append(key, values[key]);
      }
    });

    if (user === "CSI Club") {
      site = "csi";
    } else if (user === "Coders Club") {
      site = "coders";
    }

    let response;
    try {
      response = await axios.post(`/api/register/${site}-register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error(response.data.message);
    }
  };

  return (
    <div>
      <hr className="border-blue-700 mx-11 my-4" />

      <div className="md:flex mt-5 px-4 justify-between items-center ml-8">
        <div className="w-[50%]">
          <Form onFinish={submitForm} encType="multipart/form-data">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-7 gap-y-1">
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please provide email" }]}
              >
                <label
                  htmlFor="email-address-icon"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Email:
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="email-address-icon"
                      name="email" // Ensure the input has a name for Form.Item
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-3 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@flowbite.com"
                      aria-label="Email Address" // Accessibility label
                    />
                  </div>
                </label>
              </Form.Item>

              <Form.Item
                name="fullname"
                rules={[{ required: true, message: "Please provide fullname" }]}
              >
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Fullname:
                  <input
                    name="fullname"
                    type="text"
                    id="fullname" // Unique ID for the fullname input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Firstname Middlename Lastname"
                    aria-label="Full Name" // Accessibility label
                  />
                </label>
              </Form.Item>

              <Form.Item
                name="mobile"
                rules={[
                  { required: true, message: "Please provide mobile number" },
                ]}
              >
                <label
                  htmlFor="mobile"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Mobile Number:
                  <input
                    type="number"
                    name="mobile" // Ensure the input has a name for Form.Item
                    id="mobile" // Unique ID for the mobile input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mobile Number"
                    aria-label="Mobile Number" // Accessibility label
                  />
                </label>
              </Form.Item>

              <Form.Item
                name="department"
                rules={[
                  { required: true, message: "Please select department" },
                ]}
              >
                <label
                  htmlFor="department"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department:
                  <select
                    id="department"
                    name="department" // Ensure the select has a name for Form.Item
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    aria-label="Department" // Accessibility label
                  >
                    <option value="" disabled selected>
                      Choose your department
                    </option>{" "}
                    {/* Prevent auto-selection */}
                    <option value="Computer">Computer</option>
                    <option value="AIDS">AIDS</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Chemical">Chemical</option>
                  </select>
                </label>
              </Form.Item>

              <Form.Item
                name="class"
                rules={[{ required: true, message: "Please select class" }]}
              >
                <label
                  htmlFor="class"
                  className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Class:
                  <select
                    id="class"
                    name="class" // Ensure the select has a name for Form.Item
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                    aria-label="Class" // Accessibility label
                  >
                    <option value="" disabled selected>
                      Choose your class
                    </option>{" "}
                    {/* Prevent auto-selection */}
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                </label>
              </Form.Item>

              <Form.Item
                name="reciept"
                rules={[
                  { required: true, message: "Please upload screenshot" },
                ]}
              >
                <label
                  htmlFor="reciept"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Payment Screenshot:
                  <input
                    name="reciept"
                    type="file"
                    onChange={handleFileChange}
                    id="reciept" // Unique ID for the reciept input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    aria-label="Payment Screenshot" // Accessibility label
                  />
                </label>
              </Form.Item>
            </div>
            <button
              type="submit"
              className="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </Form>
        </div>
        <Lottie
          animationData={RegisterAnimi}
          loop={true}
          className="w-[350px] h-[375px] hidden md:inline"
        />
      </div>
    </div>
  );
}

export default EventForm;
