import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";
import { Redirect } from "react-router";
import ToastNotification from "./../common/toastNotification";
import { LOGIN_TOAST_MESSAGE, AGENT_LOGIN } from "./../constant";

class Login extends Form {
  state = {
    data: {
      phone: "",
      password: "",
    },
    isToastNotification: false,
    errors: {},
  };

  schema = {
    phone: Joi.string().required().label("Phone"),
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
          <img
            src="https://licmumbai.com/wp-content/uploads/2020/09/How-to-become-LIC-AGENT_-2.png"
            alt="LIC"
            title="LIC"
            className="lic_image"
          />
        </div>
        <div className="col-6">
          {isToastNotification && (
            <ToastNotification message={LOGIN_TOAST_MESSAGE} />
          )}
          <h1 className="agent-login-style">{AGENT_LOGIN}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.displayInput("phone", "Phone")}
            {this.displayInput("password", "Password", "password")}
            {this.displayButton("Login")}
          </form>
          <span>
            <a href="/register">New User ?</a> &nbsp;
            <a href="/forgotPassword">Forgot Password ?</a>
          </span>
        </div>
      </div>
    );
  }
}

export default Login;
