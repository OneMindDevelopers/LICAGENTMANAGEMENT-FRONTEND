import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/registrationService";
import auth from "../services/authService";
import ToastNotification from "./../common/toastNotification";

class Registration extends Form {
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
    phone: Joi.string().required().label("Phone"),
    password: Joi.string().required().label("Password"),
    confirmPassword: Joi.string().required().label("Confirm Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      this.setState({ isToastNotification: true });
      setTimeout(() => {
        window.location = "/login";
      }, 3000);
    } catch (ex) {
      if (ex.response) {
        this.setState({ isToastNotification: false });
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { isToastNotification } = this.state;
    return (
      <div className="row" style={{ marginTop: "8%" }}>
        <div className="col-6" style={{ borderRight: "1px solid #0f0700" }}>
          <img
            src="https://licmumbai.com/wp-content/uploads/2020/09/How-to-become-LIC-AGENT_-2.png"
            alt="LIC"
            title="LIC"
            className="lic_image"
          />
        </div>
        <div className="col-6">
          {isToastNotification && (
            <ToastNotification
              headerText="Register"
              message="Registration is successfull"
            />
          )}
          <h1 style={{ textDecoration: "underline", margin: "10px" }}>
            {"Agent Registration"}
          </h1>

          <form onSubmit={this.handleSubmit}>
            {this.displayInput("name", "Name")}
            {this.displayInput("email", "Email", "email")}
            {this.displayInput("phone", "Phone")}
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

export default Registration;
