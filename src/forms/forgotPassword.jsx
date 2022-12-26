import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";
import { Redirect } from "react-router";
import ToastNotification from "./../common/toastNotification";
import {
  AGENT_FORGOTPASSWORD,
  FORGORPASSWORD_TOAST_MESSAGE,
} from "./../constant";
import * as userService from "../services/registrationService";

class ForgotPassword extends Form {
  state = {
    data: {
      phone: "",
      password: "",
      confirmPassword: "",
    },
    isToastNotification: false,
    errors: {},
  };

  schema = {
    phone: Joi.string().required().label("Phone"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().label("ConfirmPassword"),
  };

  doSubmit = async () => {
    try {
      this.setState({ isToastNotification: true });
      await userService.forgotPassword(this.state.data);
      setTimeout(() => {
        window.location = "/login";
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
            <ToastNotification message={FORGORPASSWORD_TOAST_MESSAGE} />
          )}
          <h1 className="agent-login-style">{AGENT_FORGOTPASSWORD}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.displayInput("phone", "Phone")}
            {this.displayInput("password", "Password", "password")}
            {this.displayInput(
              "confirmPassword",
              "ConfirmPassword",
              "password"
            )}
            {this.displayButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
