import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import { connect } from "react-redux";
import {
  Title,
  Form,
  Button,
  SignUp,
  Annotation,
  Wrapper,
  Container
} from "./Landing";
import Swal from "sweetalert2";
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
      .catch(() => {
        Swal.fire({
          type: "error",
          title: "Email already registered"
        });
      });
  };

  login = () => {
    try {
      let { emailInput: email, passwordInput: password } = this.state;
      email = email.toLowerCase();
      axios.post("/auth/login", { email, password }).then(res => {
        // console.log("SESSION", res.data);
        // console.log("USERBUDGET", res.data.budgets);
        // console.log("USERINFO", res.data.user);
        const { email, budgets, user_id } = res.data.user;
        // console.log("budgets", budgets);
        this.props.setUser({ email, budgets, user_id });
        this.props.history.push("/allbudgets");
      });
    } catch {
      Swal.fire({
        type: "error",
        title: "Email already registered"
      });
    }
  };

  render() {
    const { registered } = this.state;
    return (
      <Wrapper>
        <Container>
          <Title>Email</Title>
          <Form
            type="text"
            name="emailInput"
            onChange={e => this.handleChange(e)}
          />
          <Title>Password</Title>
          <Form
            type="password"
            name="passwordInput"
            onChange={e => this.handleChange(e)}
          />

          {registered === true ? (
            <div>
              <Button onClick={this.login}>Sign-In</Button>
              <SignUp>
                <Annotation>Not a member yet?</Annotation>
                <Button sized primary onClick={this.toggleRegister}>
                  Sign Up Here
                </Button>
              </SignUp>
            </div>
          ) : (
            <div>
              <Button onClick={this.registerUser}>Register</Button>
              <SignUp>
                <Annotation> Already have an account?</Annotation>
                <Button sized primary onClick={this.toggleRegister}>
                  {" "}
                  Sign In Here{" "}
                </Button>
              </SignUp>
            </div>
          )}
        </Container>
      </Wrapper>
    );
  }
}

export default connect(
  null,
  { setUser }
)(LandingPage);
