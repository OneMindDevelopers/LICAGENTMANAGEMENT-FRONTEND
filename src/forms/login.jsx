import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../services/authService";
import { Redirect } from "react-router";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
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
        <h1 style={{textDecoration:'underline',margin:'10px'}}>{'Agent Login'}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.displayInput("email", "Email/Phone")}
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
