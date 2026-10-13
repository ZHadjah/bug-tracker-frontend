import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionLoggedSuccess, actionSetToken } from "../../redux/actions/authAction";
import MainLogo from "../../Images/InternalIssuesTicket.png";
import "../../Styles/Register.css";
import { baseUrl } from "../../API";
import { authApiRegister } from "../../API/authApi";
import { setToken } from "../../utils/appUtils";

function Register(props) {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [companyError, setCompanyError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [wasValidated, setWasValidated] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseUrl}/Companies`)
      .then((res) => setCompanies(res.data.$values))
      .catch(() => setCompanyError("Unable to load companies. Please try again later."));
  }, []);

  const onSubmitRegister = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setWasValidated(true);
    setSubmitError("");

    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const mismatch = values.password !== values.confirmPassword;
    setPasswordMismatch(mismatch);

    if (!form.checkValidity() || mismatch) return;

    delete values.confirmPassword;
    values.companyId = Number(values.companyId);
    authApiRegister(values, (response) => {
      if (!response) {
        setSubmitError("Registration failed. Please check your information and try again.");
        return;
      }

      const payload = {
        jwt: response.data.token,
        user: response.data.user.fullName,
      };

      props.actionLoggedSuccess(payload);
      setToken(payload.jwt);
      navigate("/");
    });
  };

  return (
    <main className="register-page container-fluid d-flex align-items-center justify-content-center py-4">
      <section className="card register-card shadow" aria-labelledby="register-heading">
        <div className="card-body p-4 p-md-5">
          <img
            className="img-fluid d-block mx-auto mb-4 register-logo"
            src={MainLogo}
            alt="Internal Issues Ticket"
          />
          <h1 id="register-heading" className="h3 text-center mb-4">Create an account</h1>

          {companyError && <div className="alert alert-danger" role="alert">{companyError}</div>}
          {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}

          <form
            name="register"
            autoComplete="on"
            noValidate
            className={wasValidated ? "was-validated" : ""}
            onSubmit={onSubmitRegister}
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="register-first-name">First Name</label>
                <input
                  id="register-first-name"
                  className="form-control"
                  type="text"
                  name="firstName"
                  autoComplete="given-name"
                  minLength={3}
                  maxLength={50}
                  required
                />
                <div className="invalid-feedback">Enter a first name between 3 and 50 characters.</div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label" htmlFor="register-last-name">Last Name</label>
                <input
                  id="register-last-name"
                  className="form-control"
                  type="text"
                  name="lastName"
                  autoComplete="family-name"
                  minLength={3}
                  maxLength={50}
                  required
                />
                <div className="invalid-feedback">Enter a last name between 3 and 50 characters.</div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="register-company">Company</label>
              <select
                id="register-company"
                className="form-select"
                name="companyId"
                defaultValue=""
                required
              >
                <option value="" disabled>Select a company</option>
                {companies.map((company) => (
                  <option value={company.id} key={company.id}>{company.name}</option>
                ))}
              </select>
              <div className="invalid-feedback">Select a company.</div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="register-email">Email</label>
              <input
                id="register-email"
                className="form-control"
                type="email"
                name="email"
                autoComplete="email"
                minLength={5}
                maxLength={50}
                required
              />
              <div className="invalid-feedback">Enter a valid email between 5 and 50 characters.</div>
            </div>

            <div className="mb-3">
              <label className="form-label" htmlFor="register-password">Password</label>
              <input
                id="register-password"
                className="form-control"
                type="password"
                name="password"
                autoComplete="new-password"
                minLength={5}
                maxLength={50}
                required
                onInput={(event) => {
                  const confirmPassword = event.currentTarget.form.elements.confirmPassword;
                  if (confirmPassword.value) {
                    setPasswordMismatch(
                      confirmPassword.value !== event.currentTarget.value
                    );
                  }
                }}
              />
              <div className="invalid-feedback">Enter a password between 5 and 50 characters.</div>
            </div>

            <div className="mb-4">
              <label className="form-label" htmlFor="register-confirm-password">Confirm Password</label>
              <input
                id="register-confirm-password"
                className={`form-control ${passwordMismatch ? "is-invalid" : ""}`}
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                minLength={5}
                maxLength={50}
                required
                onInput={(event) => {
                  const password = event.currentTarget.form.elements.password.value;
                  setPasswordMismatch(event.currentTarget.value !== password);
                }}
              />
              <div className="invalid-feedback">
                {passwordMismatch
                  ? "The passwords do not match."
                  : "Confirm your password (5 to 50 characters)."}
              </div>
            </div>

            <button className="btn btn-primary w-100" type="submit">Register</button>
          </form>
        </div>
      </section>
    </main>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.auth.userToken,
  loading: state.auth.loading,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ actionSetToken, actionLoggedSuccess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
