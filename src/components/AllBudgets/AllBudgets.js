import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
export class AllBudgets extends Component {
  state = {
    budgets: [],
    editing: true,
    budget_balance: this.props.budget_balance
  };

  editing = () => {
  const {editing} = this.state 
    this.setState({
      editing: !editing
    })
  }


  balance = () => {
    const {budget_balance} = this.state 
    console.log(this.props.budget)
    this.setState({
      budget_balance: budget_balance - this.props.budget.auto_loan
    })
  }
  render() {
    // console.log(this.props);
    const { budget_name, budget_balance,
       budget } = this.props;
    const {editing} = this.state 

    return (
      <div>
        {/* <h1>{budget_id}</h1> */}
        {/* <Link to="/dashboard/onebudget"> */}
        <h1>{budget_name}</h1>
        <h1 onClick={this.balance}>{this.state.budget_balance}</h1>
        <button onClick={() => this.props.delete_budget(this.props.budget_id)}>
          delete
        </button>
        <button onClick={() => this.props.pick_budget(this.props.budget_id)}>
          CHOOSE BUDGET
        </button>
        <button onClick={this.editing}>Editing</button>
        <Container>
         { editing ? <h1>
            {budget.rent_or_mortgage
              ? `Rent/Mortgage  ${budget.rent_or_mortgage}`
              : ""} 
          </h1> : <input type='number' defaultValue={budget.rent_or_mortgage} />}
          <h1>{budget.electric ? `Electric  ${budget.electric}` : ""}</h1>
          <h1>{budget.water ? `Water  ${budget.water}` : ""}</h1>
          <h1>{budget.internet ? `Internet  ${budget.internet}` : ""}</h1>
          <h1>{budget.groceries ? `groceries  ${budget.groceries}` : ""}</h1>
          <h1>
            {budget.transportation
              ? `transportation  ${budget.transportation}`
              : ""}
          </h1>
          <h1>
            {budget.auto_maintenance
              ? `auto_maintenance  ${budget.auto_maintenance}`
              : ""}
          </h1>
          <h1>
            {budget.home_maintenance
              ? `home_maintenance  ${budget.home_maintenance}`
              : ""}
          </h1>
          <h1>{budget.medical ? `medical  ${budget.medical}` : ""}</h1>
          <h1>{budget.clothing ? `clothing  ${budget.clothing}` : ""}</h1>
          <h1>{budget.gifts ? `gifts  ${budget.gifts}` : ""}</h1>
          <h1>
            {budget.computer_replacement
              ? `computer_replacement  ${budget.computer_replacement}`
              : ""}
          </h1>
          <h1>
            {budget.student_loan ? `student_loan  ${budget.student_loan}` : ""}
          </h1>
          <h1>{budget.auto_loan ? `auto loan  ${budget.auto_loan}` : ""}</h1>
          <h1>{budget.vacation ? `vacation  ${budget.vacation}` : ""}</h1>
          <h1>{budget.fitness ? `fitness  ${budget.fitness}` : ""}</h1>
          <h1>{budget.education ? `education  ${budget.education}` : ""}</h1>
          <h1>{budget.dining_out ? `dining out  ${budget.dining_out}` : ""}</h1>
          <h1>{budget.gaming ? `gaming  ${budget.gaming}` : ""}</h1>
          <h1>{budget.fun_money ? `fun_money  ${budget.fun_money}` : ""}</h1>
          <h1>{budget.dates ? `dates  ${budget.dates}` : ""}</h1>
          <h1>{budget.note ? `note  ${budget.note}` : ""}</h1>
          {/* </Link>
      {/* <h2>{budget_balance}</h2> */}
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: center; */
  /* align-items: center; */
  /* flex-wrap: 1; */
  border: 1px solid red 
  /* background: #282c34; */
`;

export default withRouter(AllBudgets);
