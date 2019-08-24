import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { getBudgetExpenses, getBudgetBalanceInfo } from "../../ducks/reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AllBudgets from ".././AllBudgets/AllBudgets";
import { Button } from "../LandingPage/Landing.js";
import "./bud.css";
export class OneBudget extends Component {
  state = {
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
    editing: false,
    balance: 0,
    defaultBalance: 0,
    total_budgeted: 0,
    previous_total: 0,
    expenses_id: 0,
    budget_id: 0
  };

  edit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };
  // updateBalance = () => {
  //   const { editing } = this.state;
  //   const {budget_balance,budget_id} = this.props
  //   console.log(budget_balance, budget_id)
  //   this.setState({
  //     editing: !editing
  //   });
  //   this.props.dynamic();
  //   this.props.updateExpenses();

  // };

  dynamic = () => {
    const {
      balance,
      total_budgeted,
      budget_id,
      previous_total,
      defaultBalance
    } = this.state;

    axios.get(`/api/specificBudget/${budget_id}`).then(res => {
      console.log("res.data", res.data);
      this.setState({
        balance: res.data[0].budget_balance
      })
    });
    // console.log("total_budgeted", total_budgeted);
    // console.log("previous_total", previous_total);
    // console.log("BUDGET BALANCE", defaultBalance);
    // console.log("UPDATED BALANCE", balance);
    // let budget_balance = defaultBalance - total_budgeted;
    // axios.put("/api/updateTotalBudgeted", { total_budgeted, budget_id });
    // axios.put("/api/updateBudget", { budget_balance, budget_id });
  };

  total = () => {
    let array = [];
    let {
      balance,
      total_budgeted,
      expenses_id,
      budget_id,
      editing,
      dates,
      budgets,
      defaultBalance,
      previous_total
    } = this.state;
    console.log("hit", budget_id);
    // console.log(this.state)
    for (let key in this.state) {
      // console.log(this.state)
      if (
        Number.isInteger(this.state[key]) &&
        this.state[key] !== balance &&
        this.state[key] !== total_budgeted &&
        this.state[key] !== expenses_id &&
        this.state[key] !== budget_id &&
        this.state[key] !== editing &&
        this.state[key] !== dates &&
        // this.state[key] !== budgets
        this.state[key] !== defaultBalance &&
        this.state[key] !== previous_total
      ) {
        array.push(this.state[key]);
        let total_budgeted = array.reduce((acc, cv) => cv + acc);
        axios
          .put("/api/updateTotalBudgeted", { total_budgeted, budget_id })
          .then(res => {
            // console.log(res.data);
            let budget_balance = defaultBalance - res.data[0].total_budgeted;
            axios.put("/api/updateBudget", { budget_balance, budget_id });
            this.setState({
              // total_budgeted: array.reduce((acc, cv) => cv + acc),
              // previous_total: total_budgeted
            });
          });
        // console.log(this.state[key]);
      }
    }

    this.dynamic();
    this.dynamic();
    // this.props.getBudgetBalanceInfo({ budget_balance, totalExpenses });
  };
  updateBalance = () => {
    // const { editing, totalExpenses } = this.state;
    // const { budget_balance, budget_id } = this.props;
    // console.log(budget_balance, budget_id);
    const { expenses_id } = this.props.budget[0];
    // console.log("updatebalanceid", expenses_id);
    this.updateExpenses(expenses_id);
    this.getExpensesProps();
    this.edit();
    this.total();
    this.dynamic();
    // console.log("state string/number", this.state);
  };

  getExpensesProps = () => {
    // console.log('this is expense id',this.props.budget[0].expenses_id);
    const { expenses_id } = this.props.budget[0];
    axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
      // console.log("expenses_id", expenses_id);

      this.setState({
        // expenses: res.data,
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
        dates: res.data[0].dates,
        balance: res.data[0].budget_balance,
        expenses_id: res.data[0].expenses_id,
        defaultBalance: res.data[0].default_balance,
        budgets: res.data,
        budget_id: res.data[0].budget_id
      });
      // console.log(res.data);
    });
  };

  updateExpenses = expenses_id => {
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
    // const { expenses_id } = this.props.budget;
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
        this.getExpensesProps(res.data[0].expenses_id);
      });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   console.log(this.props, this.state);
  //  return false
  // }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      const { expenses_id } = this.props;
      // axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
      //   const { data: expenses } = res;
      //   this.props.getBudgetExpenses({ expenses });
      // });
      this.getExpensesProps();
      // console.log("this.props.expenses_id", this.props);
    }
  };

  getBalance = () => {};

  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value
    });
    // console.log(e.target.value);
  };

  render() {
    const { expenses, budget } = this.props;
    const { editing, budgets, balance, defaultBalance } = this.state;
    const { handleChange } = this;
    // console.log("Gotten State from componentDidUPdate", this.state);

    let mapped = budgets.map(keys => {
      return (
        <div key={keys.expenses_id}>
          {/* <Button onClick={() => this.updateExpenses(keys.expenses_id)}>
            POST UPDATE TO EXPENSES
          </Button> */}
          {/* <Button onClick={this.getExpensesProps}> GET EXPENSES PROPS </Button> */}
          {/* <Button onClick={this.total}>CLICK TO REDUCE</Button> */}
          {/* <Link to={"/allbudgets"}>
            <Button> AllBudgets </Button>
          </Link> */}
          {defaultBalance < balance ? (
            <h1> Default Balance: {defaultBalance}</h1>
          ) : (
            <h1>Updated Balance: {balance}</h1>
          )}

          {/* <h1> UPDATE BALANCE: {balance}</h1> */}

          <h2>THIS STATE TOTAL BUDGET:{this.state.total_budgeted}</h2>

          <h1>
            {!editing ? (
              <p onDoubleClick={this.edit}>{`Rent/Mortgage $${
                this.state.rent_or_mortgage
              }`}</p>
            ) : (
              <>
                <p onDoubleClick={this.updateBalance}>
                  {`Rent/Mortage`}
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="rent_or_mortgage"
                    defaultValue={this.state.rent_or_mortgage}
                  />
                </p>
              </>
            )}
          </h1>

          <h1>{`Electric  $${this.state.electric}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="electric"
            defaultValue={this.state.electric}
          />
          <h1>{`Water  $${this.state.water}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="water"
            defaultValue={keys.water}
          />
          <h1>{`Internet  $${this.state.internet}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="internet"
            defaultValue={keys.internet}
          />
          <h1>{`Groceries  $${this.state.groceries}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="groceries"
            defaultValue={keys.groceries}
          />
          <h1>{`Transportation  $${this.state.transportation}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="transportation"
            defaultValue={this.state.transportation}
          />
          <h1>{`auto_maintenance  $${this.state.auto_maintenance}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="auto_maintenance"
            defaultValue={this.state.auto_maintenance}
          />
          <h1>{`home_maintenance  $${this.state.home_maintenance}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="home_maintenance"
            defaultValue={this.state.home_maintenance}
          />
          <h1>{`Medical  $${this.state.medical}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="medical"
            defaultValue={this.state.medical}
          />
          <h1>{`Clothing  $${this.state.clothing}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="clothing"
            defaultValue={this.state.clothing}
          />
          <h1>{`gifts  $${this.state.gifts}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="gifts"
            defaultValue={keys.gifts}
          />
          <h1>{`Computer_Replacement  $${this.state.computer_replacement}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="computer_replacement"
            defaultValue={keys.computer_replacement}
          />
          <h1>{`Student Loan  $${this.state.student_loan}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="student_loan"
            defaultValue={keys.student_loan}
          />
          <h1>{`auto_loan  $${this.state.auto_loan}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="auto_loan"
            defaultValue={keys.auto_loan}
          />
          <h1>{`Vacation  $${this.state.vacation}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="vacation"
            defaultValue={keys.vacation}
          />
          <h1>{`Fitness  $${this.state.fitness}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="fitness"
            defaultValue={keys.fitness}
          />
          <h1>{`Education  $${this.state.education}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="education"
            defaultValue={keys.education}
          />
          <h1>{`Dining Out  $${this.state.dining_out}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="dining_out"
            defaultValue={keys.dining_out}
          />
          <h1>{`gaming  $${this.state.gaming}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="gaming"
            defaultValue={keys.gaming}
          />
          <h1>{`Fun Money  $${this.state.fun_money}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="fun_money"
            defaultValue={keys.fun_money}
          />
          <h1>{`Date:${this.state.dates}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="text"
            name="dates"
            defaultValue={keys.dates}
          />
        </div>
      );
    });
    // console.log(this.state.rent_or_mortgage);
    return <Budge>{mapped} </Budge>;
  }
}

const Budge = styled.div`
  display: flex;
  flex-direction: column;
`;

function mapStateToProps(reduxState) {
  const {
    budget_balance,
    totalExpenses,
    expenses,
    budget,
    expenses_id
  } = reduxState;
  return { budget_balance, totalExpenses, expenses, budget, expenses_id };
}

export default connect(
  mapStateToProps,
  { getBudgetBalanceInfo, getBudgetExpenses }
)(OneBudget);
