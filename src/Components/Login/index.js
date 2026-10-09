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

  const navigate = useNavigate();

  const onSubmitLogin = (event, userandPass) => {
    event?.preventDefault();
    userandPass = userandPass || loginInfo
    // axios call to backend login POST method
    authApiLogin(userandPass.email, userandPass.password, (response) => {
      if (!response) {
        console.log("error ");
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
    <main className="login-page container-fluid d-flex align-items-center justify-content-center py-4">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <section id="loginSection" className="card shadow">
            <div className="card-body p-4 p-md-5">
              <img
                className="img-fluid d-block mx-auto mb-4 login-logo"
                src={MainLogo}
                alt="Internal Issues Ticket"
              />
              <h1 className="h3 text-center mb-4">Sign in</h1>

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
            </div>
          </section>

          <section className="card shadow-sm mt-3" aria-labelledby="demo-login-heading">
            <div className="card-body">
              <h2 id="demo-login-heading" className="h5 mb-3">Try a demo account</h2>
              <div className="d-grid gap-2 d-sm-flex flex-wrap">
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