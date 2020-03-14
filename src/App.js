import React, { Component } from "react";
import "./App.css";

const emailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  return valid;
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  }
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state.formErrors)) {
      console.log(`
        First Name:${this.state.firstName},
        last Name:${this.state.lastName},
        email:${this.state.email},
        password:${this.state.password}
      `);
    } else {
      console.error("From Invalid-Display Error Message");
    }
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;
    console.log("name", name);
    console.log("value", value);
    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 ? "minimum three characaters required" : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 6 ? "minimum three characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum three characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };
  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>create account</h1>
          <form onSubmit={this.handleSubmit} novalidation>
            <div className="firstName">
              <label htmlfor="firstName">First name</label>
              <input
                type="text"
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                name="firstName"
                novalidation
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlfor="lastName">Last name</label>
              <input
                type="text"
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="last Name"
                name="lastName"
                novalidation
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlfor="email">Email</label>
              <input
                type="email"
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                name="email"
                novalidation
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlfor="password">Password</label>
              <input
                type="password"
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="password"
                name="password"
                novalidation
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
