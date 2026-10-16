import React, { useState } from "react";
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
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const onSubmitLogin = async (event, userandPass) => {
    event?.preventDefault();
    const credentials = userandPass || loginInfo;
    setLoginError("");

    try {
      const response = await authApiLogin(credentials.email, credentials.password);
      const payload = {
        jwt: response.data.token,
        user: response.data.user.fullName,
      };

      actionLoggedSuccess(payload);
      setToken(payload.jwt);
      navigate("/");
    } catch (error) {
      setLoginError(
        error.response?.data?.message ||
          "Login failed. Check your credentials and confirm the API is running."
      );
    }
  };

  return (
    <main className="login-page container-fluid d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 login-content">
          <section id="loginSection" className="card shadow">
            <div className="card-body p-4 p-md-5">
              <img
                className="img-fluid d-block mx-auto mb-4 login-logo"
                src={MainLogo}
                alt="Internal Issues Ticket"
              />
              <h1 className="h3 text-center mb-4">Sign in</h1>

              {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}

              <form name="login" autoComplete="on" onSubmit={(event) => onSubmitLogin(event)}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    className="form-control"
                    type="email"
                    name="email"
                    autoComplete="username"
                    value={loginInfo.email}
                    onChange={(event) =>
                      setLoginInfo({ ...loginInfo, email: event.target.value })
                    }
                    placeholder="Email..."
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label" htmlFor="login-password">Password</label>
                  <input
                    id="login-password"
                    className="form-control"
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    value={loginInfo.password}
                    onChange={(event) =>
                      setLoginInfo({ ...loginInfo, password: event.target.value })
                    }
                    placeholder="Password..."
                    required
                  />
                </div>

                <button className="btn btn-primary w-100" type="submit">
                  Submit
                </button>
              </form>

              <button className="btn btn-primary w-100 mt-2" type="button" onClick={() => navigate("/auth/Register")}>
                Register
              </button>
            </div>
          </section>

          <section className="card shadow-sm mt-3" aria-labelledby="demo-login-heading">
            <div className="card-body">
              <h2 id="demo-login-heading" className="h5 mb-3 justify-content-center">Try a demo account</h2>
              <div className="login-demo-buttons">
                <button
                  id="demoAdminButton"
                  className="btn btn-primary flex-fill"
                  type="button"
                  onClick={(event) => onSubmitLogin(event, {
                    email: "demoadmin@bugtracker.com",
                    password: "Abc&123!",
                  })}
                >
                  Demo Admin
                </button>
                <button
                  id="demoPMButton"
                  className="btn btn-primary flex-fill"
                  type="button"
                  onClick={(event) => onSubmitLogin(event, {
                    email: "demopm@bugtracker.com",
                    password: "Abc&123!",
                  })}
                >
                  Demo PM
                </button>
                <button
                  id="demoDevButton"
                  className="btn btn-primary flex-fill"
                  type="button"
                  onClick={(event) => onSubmitLogin(event, {
                    email: "demodev@bugtracker.com",
                    password: "Abc&123!",
                  })}
                >
                  Demo Dev
                </button>
                <button
                  id="demoSubButton"
                  className="btn btn-primary flex-fill"
                  type="button"
                  onClick={(event) => onSubmitLogin(event, {
                    email: "demosub@bugtracker.com",
                    password: "Abc&123!",
                  })}
                >
                  Demo Sub
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
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