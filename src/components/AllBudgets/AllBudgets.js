import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import axios from "axios";
import OneBudget from ".././OneBudget/OneBudget";
import CreateBudget from '../CreateBudget/CreateBudget'
export class AllBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      editing: true,
      budget_balance: this.props.budget_balance,
      rent_or_mortgage: 0,
      electric: 0,
      water: 0,
      internet: 0,
      groceries: 0,
      transportation: 0,
      auto_maintenance: 0,
      home_maintenance: 0,
      medical: 0,
      clothing: 0,
      gifts: 0,
      computer_replacement: 0,
      student_loan: 0,
      auto_loan: 0,
      vacation: 0,
      fitness: 0,
      education: 0,
      dining_out: 0,
      gaming: 0,
      fun_money: 0,
      dates: 0,
      expenses: []
    };
  }

  getExpensesProps = () => {
    const { expenses_id } = this.props.budget;
    axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
      this.setState({
        expenses: res.data,
        rent_or_mortgage: res.data[0].rent_or_mortgage,
        electric: res.data[0].electric,
        electric: res.data[0].water,
        internet: res.data[0].internet,
        groceries: res.data[0].groceries,
        transporation: res.data[0].transporation,
        auto_maintenance: res.data[0].auto_maintenance,
        home_maintenance: res.data[0].home_maintenance,
        medical: res.data[0].medical,
        clothing: res.data[0].clothing,
        gifts: res.data[0].gifts,
        computer_replacement: res.data[0].computer_replacement,
        student_loan: res.data[0].student_loan,
        auto_loan: res.data[0].auto_loan,
        vacation: res.data[0].vacation,
        fitness: res.data[0].fitness,
        education: res.data[0].education,
        dining_out: res.data[0].dining_out,
        gaming: res.data[0].gaming,
        fun_money: res.data[0].fun_money,
        dates: res.data[0].dates
      });
      console.log(res.data);
    });
  };

  editing = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  updateExpenses = () => {
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
    } = this.state;
    const { expenses_id } = this.props.budget;
    console.log(this.state);
    axios
      .put(`/api/updateexpenses/${expenses_id}`, {
        expenses_id,
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
      })
      .then(res => {
        console.log(res.data);
      });
  };

  postExpenses = () => {
    const { budget_id } = this.props;
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
    } = this.props.budget;

    axios
      .post(`/api/createexpenses/${budget_id}`, {
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
      })
      .then(res => {
        console.log(res.data);
      });
  }

  render() {
    // console.log(this.props);
    const { budget_name, budget_balance, budget } = this.props;
    const { editing, expenses } = this.state;
    console.log(this.props.budget_id);
    // console.log(this.props.budget);
    // console.log(this.props.budget.expenses_id);
    console.log(this.state);
    // console.log(this.state.expenses);
    let mapped = expenses.map(keys => (
      <OneBudget
        key={keys.expenses_id}
        keys={keys}
        handleChange={this.handleChange}
      />
    ));

    return (
      <div>
        {/* <CreateBudget budget_id={this.props.budget_id}
        budget_id={this.props.budget_id}
        /> */}
        <button onClick={this.updateExpenses}>POST UPDATE TO EXPENSES</button>
        <button onClick={() => this.props.post_expenses(this.props.budget_id)}>POST</button>
        {/* <h1>{budget_itd}</h1> */}
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
        <button onClick={this.getExpensesProps}> GET EXPENSES PROPS </button>
        {mapped}
        {/* <Container>
          {editing ? (
            <h1>
              {budget.rent_or_mortgage
                ? `Rent/Mortgage  ${budget.rent_or_mortgage}`
                : ""}
            </h1>
          ) : (
            <input
              onChange={e => this.handleChange(e)}
              type="number"
              name="rent_or_mortgage"
              defaultValue={budget.rent_or_mortgage}
            />
          )}

          <h1>{budget.electric ? `Electric  $${budget.electric}` : ""}</h1>
          <h1>{budget.water ? `Water  $${budget.water}` : ""}</h1>
          <h1>{budget.internet ? `Internet  $${budget.internet}` : ""}</h1>
          <h1>{budget.groceries ? `groceries  $${budget.groceries}` : ""}</h1>
          <h1>
            {budget.transportation
              ? `transportation  $${budget.transportation}`
              : ""}
          </h1>
          <h1>
            {budget.auto_maintenance
              ? `auto_maintenance  $${budget.auto_maintenance}`
              : ""}
          </h1>
          <h1>
            {budget.home_maintenance
              ? `home_maintenance  $${budget.home_maintenance}`
              : ""}
          </h1>
          <h1>{budget.medical ? `medical  $${budget.medical}` : ""}</h1>
          <h1>{budget.clothing ? `clothing  $${budget.clothing}` : ""}</h1>
          <h1>{budget.gifts ? `gifts  $${budget.gifts}` : ""}</h1>
          <h1>
            {budget.computer_replacement
              ? `computer_replacement  $${budget.computer_replacement}`
              : ""}
          </h1>
          <h1>
            {budget.student_loan ? `student_loan  $${budget.student_loan}` : ""}
          </h1>
          <h1>{budget.auto_loan ? `auto loan  $${budget.auto_loan}` : ""}</h1>
          <h1>{budget.vacation ? `vacation  $${budget.vacation}` : ""}</h1>
          <h1>{budget.fitness ? `fitness  $${budget.fitness}` : ""}</h1>
          <h1>{budget.education ? `education  $${budget.education}` : ""}</h1>
          <h1>
            {budget.dining_out ? `dining out  $${budget.dining_out}` : ""}
          </h1>
          <h1>{budget.gaming ? `gaming  $${budget.gaming}` : ""}</h1>
          <h1>{budget.fun_money ? `fun_money  $${budget.fun_money}` : ""}</h1>
          <h1>{budget.dates ? `dates  $${budget.dates}` : ""}</h1>
          <h1>{budget.note ? `note  ${budget.note}` : ""}</h1>
        </Container> */}
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
  border: 1px solid red;
  /* background: #282c34; */
`;

export default withRouter(AllBudgets);
