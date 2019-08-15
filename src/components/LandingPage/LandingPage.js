import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import { connect } from "react-redux";
export class LandingPage extends Component {
  state = {
    emailInput: "",
    passwordInput: "",
    registered: true
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleRegister = () => {
    const { registered } = this.state;
    this.setState({
      registered: !registered
    });
  };

  registerUser = () => {
    const { emailInput: email, passwordInput: password } = this.state;
    axios
      .post("/auth/register", { email, password })
      .then(res => {
        console.log(res.data);
        const { email, password } = res.data.user;
        this.props.setUser({ email, password });
        this.props.history.push("/createBudget");
      })
      .catch(err => {
        alert("Email is already in use.");
      });
  };

  login = () => {
    const { emailInput: email, passwordInput: password } = this.state;
    axios.post("/auth/login", { email, password }).then(res => {
      console.log(res.data);
      console.log(res.data.user);
      const { email, password } = res.data.user;
      this.props.setUser({ email, password });
      this.props.history.push("/dashboard");
    });
  };

  render() {
    console.log(this.state.registered);
    const { registered, emailInput, passwordInput } = this.state;
    return (
      <div>
        <h6>Email</h6>
        <input
          placeholder="email"
          type="text"
          name="emailInput"
          onChange={e => this.handleChange(e)}
        />
        <h6>Password</h6>
        <input
          placeholder="password"
          type="password"
          name="passwordInput"
          onChange={e => this.handleChange(e)}
        />

        {registered === true ? (
          <div>
            <button onClick={this.login}>Sign-In</button>
            <span>Signup</span>
            <button onClick={this.toggleRegister}>Create a New Account</button>
          </div>
        ) : (
          <div>
            <button onClick={this.registerUser}>Register</button>
            <span> Already have an account?</span>
            <span onClick={this.toggleRegister}> Sign in </span>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(LandingPage);
