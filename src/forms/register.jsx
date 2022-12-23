import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/registrationService";
import auth from "../services/authService";

class Registration extends Form {
  state = {
    data: {
      email: "",
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
         <h1 style={{textDecoration:'underline',margin:'10px'}}>{'Agent Registration'}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.displayInput("email", "Email")}
            {this.displayInput("username", "Username")}
            {this.displayInput("password", "Password", "password")}
            {this.displayButton("Register")}
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
