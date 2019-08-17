import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
export class AllBudgets extends Component {
  state = {
    budgets: [],
    props: true
  };

  render() {
    // console.log(this.props);
    const { budget_name, budget_balance, budget } = this.props;
    // console.log(this.props);
    // console.log(this.props);
    console.log(this.props);
    return (
      <Container>
        {/* <h1>{budget_id}</h1> */}
        {/* <Link to="/dashboard/onebudget"> */}
        <h1>{budget_name}</h1>
        <h1>{budget_balance}</h1>
        <button onClick={() => this.props.delete_budget(this.props.budget_id)}>
          delete
        </button>
        <button onClick={() => this.props.pick_budget(this.props.budget_id)}>
          CHOOSE BUDGET
        </button>
      <h1>{budget.auto_loan}</h1>
      <h1>{budget.auto_maintenance}</h1>
      <h1>{budget.clothing}</h1>
      <h1>{budget.computer_replacement}</h1>
      <h1>{budget.dates}</h1>
      <h1>{budget.dining_out}</h1>
      <h1>{budget.education}</h1>
      <h1>{budget.electric}</h1>
      <h1>{budget.fitness}</h1>
      <h1>{budget.fun_money}</h1>
      <h1>{budget.gaming}</h1>
      <h1>{budget.gifts}</h1>
      <h1>{budget.groceries}</h1>
      <h1>{budget.home_maintenance}</h1>
      <h1>{budget.internet}</h1>
      <h1>{budget.medical}</h1>
      <h1>{budget.note}</h1>
      <h1>{budget.rent_or_mortgage}</h1>
      <h1>{budget.student_loan}</h1>
      <h1>{budget.transportation}</h1>
      <h1>{budget.vacation}</h1>
      <h1>{budget.water}</h1>

        {/* </Link>
        {/* <h2>{budget_balance}</h2> */}
      </Container>
    );
  }
}

const Container = styled.div`
  /* display: flex; */
  border: 3px solid red;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* background: #282c34; */
`;

export default withRouter(AllBudgets);
