import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import OneBudget from ".././OneBudget/OneBudget";
import { Button } from "../LandingPage/Landing";
export class AllBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      budgets: [],
      editing: true,
      balance: this.props.budget_balance,
      dates: "",
      expenses: [],
      totalExpenses: 0
    };
  }

  dynamic = () => {
    const { balance, rent_or_mortgage } = this.state;
    const {budget_id} = this.props
    let budget_balance = balance - rent_or_mortgage;
    console.log(balance);
    this.setState({
      balance: budget_balance
    });
    axios.put('/api/updateBudget', {budget_balance,budget_id})
  };

  total = () => {
    let array = [];
    const { budget_balance } = this.state;
    for (let key in this.state) {
      if (
        Number.isInteger(this.state[key]) &&
        this.state[key] !== budget_balance
      ) {
        // array.push(this.state[key])
        array.push(this.state[key]);
        console.log(array.reduce((acc, cv) => cv + acc));
      }
      array.reduce((acc, cv) => cv + acc);
      this.setState({
        totalExpenses: array
      });
    }
    // this.getExpensesProps();
  };

  getExpensesProps = () => {
    const { expenses_id } = this.props.budget;
    axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
      this.setState({
        expenses: res.data,
        rent_or_mortgage: res.data[0].rent_or_mortgage,
        electric: res.data[0].electric,
        water: res.data[0].water,
        internet: res.data[0].internet,
        groceries: res.data[0].groceries,
        transportation: res.data[0].transportation,
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
      // console.log(res.data);
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
    // console.log(e.target.value);
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
    // console.log(this.state);
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
        // console.log(res.data);
        this.getExpensesProps();
      });
  };

  render() {
    const { budget_name, budget_balance, budget } = this.props;
    const { editing, expenses } = this.state;
    
    console.log("expenses total", this.state.totalExpenses);
    console.log('budget_balance', budget_balance)
    let mapped = expenses.map(keys => (
      <OneBudget
        key={keys.expenses_id}
        keys={keys}
        handleChange={this.handleChange}
        dynamic={this.dynamic}
        budget_balance={this.state.balance}
        updateExpenses={this.updateExpenses}
        budget_id={this.props.budget_id}
      />
    ));

    return (
      <div>
        <Button onClick={this.updateExpenses}>POST UPDATE TO EXPENSES</Button>

        <h1 onClick={this.dynamic}> {budget_name}</h1>
        <h1 onClick={this.balance}>
          {" "}
          Budget Balance:{this.state.balance}
        </h1>
        <Button onClick={() => this.props.delete_budget(this.props.budget_id)}>
          delete
        </Button>
        <Button onClick={() => this.props.pick_budget(this.props.budget_id)}>
          CHOOSE BUDGET
        </Button>
        <Button onClick={this.editing}>Editing</Button>
        <Button onClick={this.getExpensesProps}> GET EXPENSES PROPS </Button>
        <Button onClick={this.total}>CLICK TO REDUCE</Button>
        {mapped}
      </div>
    );
  }
}

export default withRouter(AllBudgets);
