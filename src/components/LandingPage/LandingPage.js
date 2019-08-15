import React, { Component } from "react";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import { connect } from "react-redux";
import styled from "styled-components";
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

const Wrapper = styled.div`
  background-color: #f8f9fe;
  height: 90vh;
`;


const Container = styled.div`
  display: flex;
  border: 3px solid #8AA5AD;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background: #282c34; */
  width: 25%;
  height: 45vh;
  position: relative;
  top: 20vh;
  left: 36vw;
`;
const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #122C34;
`;

const Annotation = styled.span`
  font-size: 1rem;
  text-align: center;
  color: #122C34;
`;

const Button = styled.button`
  /* display: inline-block; */
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #122C34;;
  border-radius: 3px;
  cursor: pointer;
  background: ${props => (props.primary ? "'#8AA5AD'" : '#F8F9FE')};
  color: ${props => (props.primary ? "black" : "black")};
  /* display: block; */
  font-size: ${props => (props.sized ? '0.8em': '1.3em')}
`;

const Form = styled.input`
  width: 50%;
  border-radius: 5%;
  padding: 5px;
  background: rgba(255, 255, 255, 0.5);
  margin: 0 0 10px 0;
`;

const SignUp = styled.div`
  display: flex;
  /* border: 1px solid green; */
  justify-content: center;
  align-items: center;
`;

export default connect(
  null,
  { setUser }
)(LandingPage);
