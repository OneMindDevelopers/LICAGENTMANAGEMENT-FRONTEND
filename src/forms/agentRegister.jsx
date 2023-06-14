import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import * as userService from "../services/registrationService";
import ToastNotification from "../common/toastNotification";
import { AGENT_REGISTRATION, REGISTER_TOAST_MESSAGE } from "../constant";
import HomePageBackgroundImage from "../common/homePageBackgorundImage";

class AgentRegistration extends Form {
  state = {
    data: {
      name: "",
      agentID: "",
      phone: "",
      email: "",

      nomineeName: "",
      mobile: "",
      address: "",
      relationship: "",
    },
    isToastNotification: false,
    errors: {},
  };

  componentDidMount = () => {
    this.setState({ isToastNotification: false });
  };

  schema = {
    name: Joi.string().required().label("Name"),
    agentID: Joi.string().required().label("AgentID"),
    email: Joi.string().required().email().label("Email"),
    phone: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .label("Phone Number"),

    nomineeName: Joi.string().required().label("Nominee Name"),
    mobile: Joi.string()
      .required()
      .regex(/^[0-9]{10}$/)
      .label("Nominee Phone Number"),
    address: Joi.string().required().label("Nominee Address"),
    relationship: Joi.string().required().label("Nominee Relationship"),
  };

  doSubmit = async () => {
    try {
      const data = [...this.state.data];
      let agentRegistration = {};
      agentRegistration.name = data.name;
      agentRegistration.agentID = data.agentID;
      agentRegistration.agentID = data.phone;
      agentRegistration.email = data.email;
      agentRegistration.nominee = {};
      agentRegistration.nominee.name = data.nomineeName;
      agentRegistration.nominee.mobile = data.mobile;
      agentRegistration.nominee.address = data.address;
      agentRegistration.nominee.relationship = data.relationship;


      await userService.agentRegistration(agentRegistration);
      this.setState({ isToastNotification: true });
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
    return (
      <React.Fragment>
        <h1 className="agent-registration-style">{AGENT_REGISTRATION}</h1>
        <form onSubmit={this.handleSubmit} className="row g-3">
          <div className="col-md-6">
            {this.displayInput("agentID", "AgentID")}
          </div>

          <div className="col-md-6">{this.displayInput("name", "Name")}</div>

          <div className="col-md-6">
            {this.displayInput("email", "Email", "email")}
          </div>

          <div className="col-md-6">
            {this.displayInput("phone", "Mobile Number")}
          </div>

          <div className="col-12">
            <h5>Nominee Details</h5>
            <hr />
          </div>

          <div className="col-md-6">
            {this.displayInput("nomineeName", "NomineeName")}
          </div>

          <div className="col-md-6">
            {this.displayInput("mobile", "Mobile Number")}
          </div>

          <div className="col-md-6">
            {this.displayInput("address", "Address")}
          </div>

          <div className="col-md-6">
            {this.displayInput("relationship", "Relationship")}
          </div>

          <div className="col-md-12 text-center">
            {this.displayButton("Register")}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AgentRegistration;
