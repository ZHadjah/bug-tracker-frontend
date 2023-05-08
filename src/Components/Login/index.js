import React, { useState } from "react";
import { Button, Form, Input, Card, Space, Col, Row } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionLoggedSuccess, actionSetToken, } from "../../redux/actions/authAction";
import MainLogo from "../../Images/InternalIssuesTicket.png";
import { setToken } from "../../utils/appUtils";
import { useNavigate } from "react-router-dom";
import { authApiLogin } from "../../API/authApi";
import "../../Styles/Login.css";

function Login(props) {
  // const dispatch = useDispatch();
  // const authUser = useSelector(x => x.auth.user);
  // const authError = useSelector(x => x.auth.error);
  const { actionLoggedSuccess } = props;

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onSubmitLogin = (event, userandPass) => {
    event?.preventDefault();
    userandPass = userandPass || loginInfo
    // axios call to backend login POST method
    authApiLogin(loginInfo.email, loginInfo.password, (response) => {
      if (!response) {
        console.log("error === ");
        return;
      } else {
        //change global state value
        let payload = {
          jwt: response.data.token,
          user: response.data.user.fullName,
        };

        actionLoggedSuccess(payload);
        setToken(payload.jwt);
        navigate("/");
      }
    });
  };

  return (
    <div>

    <Row   style={{ justifyContent: 'center' }}>
      <Col style={{  }}>
      <Space className="login-card-container" direction="vertical">
      <Card className="login-card">
          <img
            className="justify-content-center"
            src={MainLogo}
            alt="InternalIssuesTicket"
          
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
              justifyContent: "center",
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onSubmitCapture={(event) => onSubmitLogin(event)}
          >
            <Form.Item
              label="Email"
              name="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                },
              ]}
            >
              <Input
                type="email"
                value={loginInfo.email}
                onChange={(e) =>
                  setLoginInfo({
                    ...loginInfo,
                    email: e.target.value,
                  })
                }
                placeholder="Email..."
                required
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                type="password"
                value={loginInfo.password}
                onChange={(e) =>
                  setLoginInfo({
                    ...loginInfo,
                    password: e.target.value,
                  })
                }
                placeholder="Password..."
                required
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card className="demo-card" style={{ marginTop: "10px" }}>
          <Form onSubmitCapture={onSubmitLogin}>
            <Space size="small">
              <Button
                type="primary"
                onClick={event => {
                  onSubmitLogin(event, {
                    email: "demoadmin@bugtracker.com",
                    password: "Abc&123",
                  });
                }}
              >
                Demo Admin
              </Button>
              <Button
                type="primary"
                onClick={event => {
                  onSubmitLogin(event, {
                    email: "demopm@bugtracker.com",
                    password: "Abc&123",
                  });
                }}
              >
                Demo PM
              </Button>

              <Button
                type="primary"
                onClick={event => {
                  onSubmitLogin(event, {
                    email: "demodev@bugtracker.com",
                    password: "Abc&123",
                  });
                }}
              >
                Demo Dev
              </Button>
              <Button
                type="primary"
                onClick={event => {
                  onSubmitLogin(event, {
                    email: "demosub@bugtracker.com",
                    password: "Abc&123",
                  });
                }}
              >
                Demo Sub
              </Button>
            </Space>
          </Form>
        </Card>
    </Space>
      </Col>
    </Row>


    


      




    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.auth.userToken,
  loading: state.auth.loading,
  user: state.auth.user, //for user obj
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ actionSetToken, actionLoggedSuccess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);