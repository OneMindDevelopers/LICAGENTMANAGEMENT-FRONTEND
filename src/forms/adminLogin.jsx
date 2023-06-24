import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";
import { Redirect } from "react-router";
import ToastNotification from "../common/toastNotification";
import { LOGIN_TOAST_MESSAGE, ADMIN_LOGIN } from "../constant";
import HomePageBackgroundImage from "../common/homePageBackgorundImage";

class AdminLogin extends Form {
  state = {
    data: {
      phone: "",
      password: "",
    },
    isToastNotification: false,
    errors: {},
  };

  schema = {
    phone: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .label("Phone Number"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      this.setState({ isToastNotification: true });
      const { data } = this.state;
      await auth.login(data.phone, data.password);
      setTimeout(() => {
        window.location = "/gallary";
      }, 3000);
    } catch (ex) {
      if (ex.response) {
        this.setState({ isToastNotification: false });
        const errors = { ...this.state.errors };
        errors.phone = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { isToastNotification } = this.state;
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="row margin-top">
        <div className="col-6 border-right">
          <HomePageBackgroundImage />
        </div>
        <div className="col-6 background-image  ">
          <h1 className="agent-login-style">{ADMIN_LOGIN}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.displayInput("phone", "Mobile Number")}
            {this.displayInput("password", "Password", "password")}
            {this.displayButton("Login")}
          </form>
          <span>
            <a href="/register" className="black">
              New User ?
            </a>{" "}
            &nbsp;
            <a href="/forgotPassword" className="black">
              Forgot Password ?
            </a>
          </span>
          <div className="login-toast-message">
            {isToastNotification && (
              <ToastNotification message={LOGIN_TOAST_MESSAGE} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
