import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleValueChange = ({ currentTarget: input }) => {
    const errors = {};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validate = () => {
    const errors = {};
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  displayInput = (name, label, type = "text", placeholderText) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        type={type}
        label={label}
        value={data[name]}
        handleValueChange={this.handleValueChange}
        error={errors[name]}
        placeholderText={placeholderText}
      />
    );
  };

  displaySelect = (name, label, genres) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        genres={genres}
        value={data[name]}
        handleValueChange={this.handleValueChange}
        error={errors[name]}
      />
    );
  };

  displayButton = (label) => {
    return (
      <button
        className="btn btn-primary btn-small m-2"
        disabled={this.validate()}
      >
        {label}
      </button>
    );
  };
}

export default Form;
