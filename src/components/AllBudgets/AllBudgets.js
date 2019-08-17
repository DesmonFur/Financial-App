import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
export class AllBudgets extends Component {
  state = {
    budgets: this.props.budget
  };

  render() {
    // console.log(this.props);
    const { budget_name } = this.props;
    // const {budget_name,budget_balance,budget_id} = this.props
    return (
      <Container>
        {/* <h1>{budget_id}</h1> */}
        {/* <Link to="/dashboard/onebudget"> */}
        <h1>{budget_name}</h1>
        <button onClick={() => this.props.delete_budget(this.props.budget_id)}>
          delete
        </button>
        <button onClick={() => this.props.pick_budget(this.props.budget_id)}>
          CHOOSE BUDGET
        </button>
        {/* </Link> */}
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

export default AllBudgets;
