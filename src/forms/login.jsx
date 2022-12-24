import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";
import { Redirect } from "react-router";
import ToastNotification from "./../common/toastNotification";

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
      const { data } = this.state;
      await auth.login(data.phone, data.password);
      const { state } = this.props.location;
      this.setState({ isToastNotification: true });
      setTimeout(() => {
        window.location = state ? state.from.pathname : "/gallary";
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
            <ToastNotification message="Login is successfull" />
          )}
          <h1 style={{ textDecoration: "underline", margin: "10px" }}>
            {"Agent Login"}
          </h1>
          <form onSubmit={this.handleSubmit}>
            {this.displayInput("phone", "Phone")}
            {this.displayInput("password", "Password", "password")}
            {this.displayButton("Login")}
          </form>
          <span>
            <a href="/register">New User ?</a>
          </span>
        </div>
      </div>
    );
  }
}

export default Login;
