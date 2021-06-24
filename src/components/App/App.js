/* eslint-disable react-hooks/exhaustive-deps */

import "./App.scss";
import { useState, useEffect } from "react";
import Errors from "../Errors/Errors";

const App = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    formValid: false,
    emailValid: false,
    passwordValid: false,
    formErrors: { email: "", password: "" },
  });
  const { email, password, emailValid, passwordValid, formValid, formErrors } =
    data;
  const validateField = (fieldName, value) => {
    let fieldValidationErrors = formErrors;
    let newEmailValid = emailValid;
    let newPasswordValid = passwordValid;
    switch (fieldName) {
      case "email":
        newEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = newEmailValid ? "" : " is invalid";
        break;
      case "password":
        newPasswordValid = value.length >= 6;
        fieldValidationErrors.password = newPasswordValid
          ? ""
          : " is too short.";
        break;
      default:
        break;
    }
    setData({
      ...data,
      formErrors: fieldValidationErrors,
      emailValid: newEmailValid,
      passwordValid: newPasswordValid,
    });
  };
  const validateForm = () => {
    setData({
      ...data,
      formValid: emailValid && passwordValid,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Form has been submitted to https://localhost:8000/api/login. You sent email: ${email} and password: ${password}.`
    );
  };
  const handleModal = (e, text) => {
    e.preventDefault();
    alert(text);
  };
  const errorClass = (error) =>
    error.trim() === "" ? "" : "form__section--error";
  useEffect(() => {
    if (emailValid || passwordValid) {
      validateForm();
    }
  }, [formErrors, emailValid, passwordValid]);
  useEffect(() => {
    if (email.trim() !== "") {
      validateField("email", email);
    }
    if (password.trim() !== "") {
      validateField("password", password);
    }
  }, [email, password]);
  return (
    <form className="form" onSubmit={handleSubmit}>
      <fieldset className="form__fieldset">
        <legend className="form__legend">Sign in</legend>
        <Errors formErrors={formErrors} />
        <section className={`form__section ${errorClass(formErrors.email)}`}>
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            className="form__input form__input--base"
            type="text"
            id="email"
            name="email"
            placeholder=""
            value={email}
            required
          />
        </section>
        <section className={`form__section ${errorClass(formErrors.password)}`}>
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            onChange={handleChange}
            className="form__input form__input--base"
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder=""
            required
          />
        </section>
        <section className="form__section form__section--remember">
          <input
            className="form__input form__input--checkbox"
            type="checkbox"
            id="remember-me"
            name="remember-me"
            placeholder=""
          />
          <label
            className="form__label form__label--remember"
            htmlFor="remember-me"
          >
            Remember me?
          </label>
        </section>
        <section className="form__section">
          <button className="form__button" type="submit" disabled={!formValid}>
            Sign in
          </button>
        </section>
        <nav className="form__nav">
          <a
            onClick={(e) => handleModal(e, "This is a forgot password dialog.")}
            href="/forgot-password"
            className="form__link form__a"
            tabIndex="0"
          >
            Forgot your password?
          </a>
          <span className="form__link">
            Don't have an account?
            <a
              onClick={(e) => handleModal(e, "This is a signup dialog.")}
              href="/sign-up"
              className="form__a form__a--signup"
              tabIndex="0"
            >
              Sign up
            </a>
          </span>
          <a
            onClick={(e) => handleModal(e, "This is a resend email dialog.")}
            href="/resend-email"
            className="form__a form__link"
            tabIndex="0"
          >
            Resend email confirmation
          </a>
        </nav>
      </fieldset>
    </form>
  );
};

export default App;
