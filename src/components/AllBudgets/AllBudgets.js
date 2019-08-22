import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import OneBudget from ".././OneBudget/OneBudget";
import { Button } from "../LandingPage/Landing";
import {
  getExpenseId,
  expenseFn,
  getBudget
} from "../../ducks/reducer";
import { connect } from "react-redux";

class AllBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      expenses: []
    };
  }

  deleteBudget = budget_id => {
    const { user_id } = this.props;
    axios
      .delete(`/api/deleteBudget/${budget_id}/${user_id}`)
      .then(
        axios.get(`/api/budgets/${user_id}`).then(res => {
          // console.log(res.data);
          this.setState({
            budgets: res.data
          });
        })
      )
      .catch(err => alert("failled to delete"));
  };

  dynamic = () => {
    const { balance, totalExpenses: total_budgeted } = this.state;
    const { budget_id } = this.props;
    console.log("balance", balance);
    let budget_balance = balance - total_budgeted;
    this.setState({
      balance: budget_balance
    });
    axios.put("/api/updateTotalBudgeted", { total_budgeted, budget_id });
    axios.put("/api/updateBudget", { budget_balance, budget_id });
    console.log("TOTAL_BUDGETED", total_budgeted);
  };

  total = () => {
    let array = [];
    const { balance: budget_balance, totalExpenses } = this.state;
    for (let key in this.state) {
      if (
        Number.isInteger(this.state[key]) &&
        this.state[key] !== budget_balance &&
        this.state[key] !== totalExpenses
      ) {
        array.push(this.state[key]);
        console.log(array.reduce((acc, cv) => cv + acc));
      }

      this.setState({
        totalExpenses: array.reduce((acc, cv) => cv + acc)
        // totalExpenses: 10000
      });
    }
    this.props.getBudgetBalanceInfo({ budget_balance, totalExpenses });
    this.dynamic();
  };

  pickBudget = budget_id => {
    // const { email, user_id, budgets, props } = this.props;
    axios.get(`/api/specificBudget/${budget_id}`).then(res => {
      console.log("undefined catch", res.data);
      const { data: budget } = res;
let expenses_id = res.data.map(data => data.expenses_id[0])
let string = expenses_id.toString()
console.log('amepfmepfme', expenses_id)
      this.props.getBudget({ budget});
      // this.setState({
      //   budgets: res.data
      // });
    });
  };

  // getExpensesProps = () => {
  //   const { expenses_id } = this.props.budget;
  //   axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
  //     this.setState({
  //       expenses: res.data,
  //       rent_or_mortgage: res.data[0].rent_or_mortgage,
  //       electric: res.data[0].electric,
  //       water: res.data[0].water,
  //       internet: res.data[0].internet,
  //       groceries: res.data[0].groceries,
  //       transportation: res.data[0].transportation,
  //       auto_maintenance: res.data[0].auto_maintenance,
  //       home_maintenance: res.data[0].home_maintenance,
  //       medical: res.data[0].medical,
  //       clothing: res.data[0].clothing,
  //       gifts: res.data[0].gifts,
  //       computer_replacement: res.data[0].computer_replacement,
  //       student_loan: res.data[0].student_loan,
  //       auto_loan: res.data[0].auto_loan,
  //       vacation: res.data[0].vacation,
  //       fitness: res.data[0].fitness,
  //       education: res.data[0].education,
  //       dining_out: res.data[0].dining_out,
  //       gaming: res.data[0].gaming,
  //       fun_money: res.data[0].fun_money,
  //       dates: res.data[0].dates
  //       // totalExpenses:res.data[0].fun_money + res.data[0].fun_money
  //     });
  //     // console.log(res.data);
  //   });
  // };

  editing = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
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
  componentDidMount() {
    this.getAllBudgets();
  }

  getAllBudgets = () => {
    const { user_id, props } = this.props;
    axios.get(`/api/getUserBudgets/${user_id}`).then(res => {
      this.setState({
        budgets: res.data
      });
    });
  };

  render() {
    const { editing, expenses, budgets } = this.state;
    // console.log('total budgeted',budget.total_budgeted)
    console.log("user budgets", budgets);
    console.log("all props", this.props);
    console.log("everything", this.state.budgets);
    // console.log("everything", this.state.budgets[0].expenses_id);

    // let mapped = expenses.map(keys => (
    //   <OneBudget
    //     key={keys.expenses_id}
    //     // keys={keys}
    //     expenses_id={keys.expenses_id}
    //     budget_id={this.props.budget_id}
    //     pickBudget={this.pickBudget}
    //     // dynamic={this.dynamic}
    //     // updateExpenses={this.updateExpenses}
    //     // updateBalance={this.updateBalance}
    //     // total={this.total}
    //   />
    // ));

    let mappedBudgets = budgets.map(budget => {
      const { budget_name, budget_balance, budget_id } = budget;

      return (
        <div key={budget.budget_id}>
          {/* console.log(budgets) */}
          {/* <Button onClick={this.updateExpenses}>POST UPDATE TO EXPENSES</Button> */}

          <h1 onClick={this.dynamic}> {budget_name}</h1>
          <h1 onClick={this.balance}> Budget Balance:{budget_balance}</h1>
          <button onClick={this.getAllBudgets}> AllBudgets </button>
          <Button onClick={() => this.deleteBudget(budget_id)}>delete</Button>
          <Link to={"/onebudget"}>
            <Button onClick={() => this.pickBudget(budget_id)}>
              CHOOSE BUDGET
            </Button>
          </Link>
          {/* 
          <Button onClick={this.getExpensesProps}> GET EXPENSES PROPS </Button>
          <Button onClick={this.total}>CLICK TO REDUCE</Button> */}
          {/* {mapped} */}
        </div>
      );
    });

    return (
      <div>
        {mappedBudgets}
        {/* {mapped} */}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  console.log("reduxstate", reduxState);
  const { user_id } = reduxState;
  return { user_id };
}

export default connect(
  mapStateToProps,
  { getExpenseId, getBudget }
)(AllBudgets);
