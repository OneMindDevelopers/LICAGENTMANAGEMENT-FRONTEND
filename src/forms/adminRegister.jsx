import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/registrationService";
import ToastNotification from "../common/toastNotification";
import { ADMIN_REGISTRATION, REGISTER_TOAST_MESSAGE } from "../constant";
import HomePageBackgroundImage from "../common/homePageBackgorundImage";

class AdminRegistration extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    isToastNotification: false,
    errors: {},
  };

  componentDidMount = () => {
    this.setState({ isToastNotification: false });
  };

  schema = {
    name: Joi.string().required().label("Name"),
    email: Joi.string().required().email().label("Email"),
    phone: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .label("Phone Number"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().label("Confirm Password"),
  };

  doSubmit = async () => {
    try {
      await userService.register(this.state.data);
      this.setState({ isToastNotification: true });
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
    return (
      <div className="row margin-top">
        <div className="col-6 border-right">
          <HomePageBackgroundImage />
        </div>
        <div className="col-6 background-image">
          {isToastNotification && (
            <ToastNotification message={REGISTER_TOAST_MESSAGE} />
          )}

          <h1 className="agent-registration-style">{ADMIN_REGISTRATION}</h1>

          <form onSubmit={this.handleSubmit}>
            {this.displayInput("name", "Name")}
            {this.displayInput("email", "Email", "email")}
            {this.displayInput("phone", "Mobile Number")}
            {this.displayInput("password", "Password", "password")}
            {this.displayInput(
              "confirmPassword",
              "ConfirmPassword",
              "password"
            )}
            {this.displayButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default AdminRegistration;
