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
import HomePageBackgroundImage from "../common/homePageBackgorundImage";

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
    phone: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .label("Phone Number"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .label("Confirm Password")
      .required()
      .options({ language: { any: { allowOnly: "must match password" } } }),
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
          <HomePageBackgroundImage />
        </div>
        <div className="col-6 background-image">
          {isToastNotification && (
            <ToastNotification message={FORGORPASSWORD_TOAST_MESSAGE} />
          )}

          <br></br>
          <br></br>
          <h1 className="agent-login-style">{AGENT_FORGOTPASSWORD}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.displayInput("phone", "Mobile Number")}
            {this.displayInput("password", "Password", "password")}
            {this.displayInput(
              "confirmPassword",
              "Confirm Password",
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
