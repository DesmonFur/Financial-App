import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "../LandingPage/Landing.js";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../../ducks/reducer";
import styled from "styled-components";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";

export class createBudget extends Component {
  constructor() {
    super();
    this.state = {
      budget_balance: 0,
      default_balance: 0,
      budget_name: "",
      budget_id: 0,
      expenses: []
    };
    this.postEverything = this.postEverything.bind(this);
  }

  postEverything = () => {
    const {
      budget_balance,
      budget_name,
      budget_balance: default_balance
    } = this.state;
    const { user_id, email, budgets } = this.props;

    const {
      rent_or_mortgage,
      electric,
      water,
      internet,
      groceries,
      transportation,
      auto_maintenance,
      home_maintenance,
      medical,
      clothing,
      gifts,
      computer_replacement,
      student_loan,
      auto_loan,
      vacation,
      fitness,
      education,
      dining_out,
      gaming,
      fun_money,
      dates
    } = this.state.expenses;

    axios
      .post("/api/createBudget", {
        user_id,
        budget_name,
        budget_balance,
        default_balance
      })
      .then(res => {
        this.props.setUser({ email, user_id, budgets });
        this.setState({
          budget_id: res.data[res.data.length - 1].budget_id
        });
        // console.log(res.data[res.data.length - 1].budget_id);
        axios
          .post(
            `/api/createexpenses/${res.data[res.data.length - 1].budget_id}`,
            {
              rent_or_mortgage,
              electric,
              water,
              internet,
              groceries,
              transportation,
              auto_maintenance,
              home_maintenance,
              medical,
              clothing,
              gifts,
              computer_replacement,
              student_loan,
              auto_loan,
              vacation,
              fitness,
              education,
              dining_out,
              gaming,
              fun_money,
              dates
            }
          )
          .then(res => {
            console.log(res.data);
            Swal.fire({
              type: "success",
              title: "Awesome...",
              text: "Your Budget has been Successfully Created!"
            }).then(function(){window.location.reload()})
            console.log(this.props.location);
          });
      })
      .catch(() =>
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "<a href>Why do I have this issue?</a>"
        })
      );

    // window.location.reload()
  };

  push = () => {
    this.props.history.push("/allbudgets");
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // console.log(this.state.budget_id);
    // console.log(this.state.expenses);
    console.log(this.props);
    return (
      <CreatedWrapper>
        <Title>
          <h1>Create Budget </h1>
        </Title>
        <Heading3>Give it a nickname</Heading3>
        <Input onChange={this.handleChange} type="text" name="budget_name" />
        <Heading3>What is your current account balance?</Heading3>

        <NumberFormat
          value={this.state.budget_balance}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
          decimalScale={2}
          fixedDecimalScale={true}
        />

        <Input
          onChange={this.handleChange}
          type="number"
          name="budget_balance"
        />
          <CreateButton onClick={this.postEverything}>
            {" "}
            Create Budget
          </CreateButton>
      </CreatedWrapper>
    );
  }
}
const Title = styled.div`
  /* border: 1px solid red; */
  display: flex;
  width: 14vw;
  justify-content: center;
  align-items: center;
`;

const CreateButton = styled.button`
  /* display: inline-block; */
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #122c34;
  border-radius: 3px;
  cursor: pointer;
  width: 15vw;
  background: ${props => (props.primary ? "'#8AA5AD'" : "#F8F9FE")};
  color: ${props => (props.primary ? "black" : "black")};
  /* display: block; */
  font-size: ${props => (props.sized ? "0.8em" : "1.3em")};
`;

const Heading3 = styled.h3`
  /* border: 1px solid red; */
  width: 25vw;
  font-size: 29px;
  margin: 5px;
`;

const Input = styled.input`
  /* display:flex; */
  border: 2px solid rgb(136, 151, 157);
  display: inline-block;
  font-weight: 400;
  height: 35px;
  letter-spacing: normal;
  line-height: normal;
  margin: 0, 0, 0, 4px;
  padding: 7px, 7px, 7px, 7px;
  padding-bottom: 7px;
  padding-left: 7px;
  padding-right: 7px;
  padding-top: 7px;
  width: 448px;
  word-spacing: 0px;
  writing-mode: horizontal-tb;
`;

const CreatedWrapper = styled.div`
  display: flex;
  padding: 15%;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  height: 70%;
  width: 40%;
  top: 20vh;
  right: 29.5vw;
  color: black;
  border: 3px solid #8aa5ad;
`;

function mapStateToProps(reduxState) {
  const { user_id, email, budgets } = reduxState;
  return { user_id, email, budgets };
}
export default connect(
  mapStateToProps,
  { setUser }
)(createBudget);
