import axios from "axios";
import { Button, Form, Input, Card, Select } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionLoggedSuccess, actionSetToken, } from "../../redux/actions/authAction";
import MainLogo from "../../Images/InternalIssuesTicket.png";
import "../../Styles/Register.css";
import { baseUrl } from "../../API";
import { authApiRegister } from "../../API/authApi";
import { setToken } from "../../utils/appUtils";

const { Option } = Select;

function Register(props) {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/Companies`).then((res) => {
      setCompanies(res.data.$values);
    });
  }, []);

  const onSubmitRegister = (values) => {
    
    //take confirm pass out of the array  
    delete values.confirmPassword

    authApiRegister(values, (response) => {
      if (!response) {
        console.log("error === ");
        return;
      } else {
        //change global state value
        let payload = {
          jwt: response.data.token,
          user: response.data.user.fullName,
        };

        console.log(`jwt = ${payload.jwt}, user = ${payload.user}`)

        actionLoggedSuccess(payload);
        setToken(payload.jwt);
        navigate("/");
      }
    });
  };

  return (
    <Card className="register-card">
      <img
        src={MainLogo}
        alt="InternalIssuesTicket"
        style={{ width: "300px" }}
      />

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onSubmitRegister}
      >
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
            {
              pattern:"^.{3,50}$",
              message: "First name must be between 3 and 50 characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
            {
              pattern:"^.{3,50}$",
              message: "Last name must be between 3 and 50 characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="companyId"
          label="Company"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select a company">
            {companies.map((company) => (
              <Option value={company.id} key={company.id}>
                {company.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
              type: "email",
            },
            {
              pattern:"^.{5,50}$",
              message: "Email must be between 5 and 50 characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              pattern:"^.{5,50}$",
              message: "Password must be between 5 and 50 characters!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Pass"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            {
              pattern:"^.{5,50}$",
              message: "Password must be between 5 and 50 characters!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.auth.userToken,
  loading: state.auth.loading,
  user: state.auth.user, //for user obj
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ actionSetToken, actionLoggedSuccess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);