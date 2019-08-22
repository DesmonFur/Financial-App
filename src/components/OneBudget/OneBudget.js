import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { getBudgetExpenses, getBudgetBalanceInfo } from "../../ducks/reducer";
import { connect } from "react-redux";
import { createPublicKey } from "crypto";
import { Link } from "react-router-dom";
import AllBudgets from ".././AllBudgets/AllBudgets";
import { Button } from "../LandingPage/Landing.js";
export class OneBudget extends Component {
  state = {
    editing: false,
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
    edit: true,
    budget_balance: 0,
    totalExpenses: 0
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
  updateBalance = () => {
    // const { editing, totalExpenses } = this.state;
    // const { budget_balance, budget_id } = this.props;
    // console.log(budget_balance, budget_id);
    const { expenses_id } = this.props.budget[0];
    console.log(expenses_id);
    this.edit();
    this.updateExpenses(expenses_id);
    this.getExpensesProps();
    // this.props.dynamic();
    //  this.props.total()
  };

  getExpensesProps = () => {
    console.log(this.props.budget[0].expenses_id);
    const { expenses_id } = this.props.budget[0];
    axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
      console.log("expenses_id", expenses_id);

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
        dates: res.data[0].dates
        // totalExpenses:res.data[0].fun_money + res.data[0].fun_money
      });
      console.log(res.data);
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
        console.log(res.data);
        this.getExpensesProps(res.data[0].expenses_id);
      });
  };

  // componentDidMount = () => {
  //   const { expenses_id } = this.props;
  //   axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
  //     const { data: expenses } = res;
  //     this.props.getBudgetExpenses({ expenses });
  //   });
  //   // this.getExpensesProps();
  //   console.log("this.props.expenses_id", this.props);
  // };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      const { expenses_id } = this.props;
      // axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
      //   const { data: expenses } = res;
      //   this.props.getBudgetExpenses({ expenses });
      // });
      this.getExpensesProps();
      console.log("this.props.expenses_id", this.props);
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  render() {
    const { expenses, budget } = this.props;
    const { editing } = this.state;
    const { handleChange } = this;
    console.log("STATETATATETA", this.state);

    let mapped = budget.map(keys => {
      return (
        <div key={keys.expenses_id}>
          <Button onClick={() => this.updateExpenses(keys.expenses_id)}>
            POST UPDATE TO EXPENSES
          </Button>
          <Button onClick={this.getExpensesProps}> GET EXPENSES PROPS </Button>
          <Button onClick={this.total}>CLICK TO REDUCE</Button>}
          <Link to={"/allbudgets"}>
            <button> AllBudgets </button>
          </Link>
          <h1>
            Budget Balance
            {keys.budget_balance}
          </h1>
          {keys.total_budgeted}
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
                    defaultValue={keys.rent_or_mortgage}
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
            defaultValue={keys.electric}
          />
          <h1>{`Water  $${keys.water}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="water"
            defaultValue={keys.water}
          />
          <h1>{`Internet  $${keys.internet}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="internet"
            defaultValue={keys.internet}
          />
          <h1>{`Groceries  $${keys.groceries}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="groceries"
            defaultValue={keys.groceries}
          />
          <h1>{`Transportation  $${keys.transportation}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="transportation"
            defaultValue={keys.transportation}
          />
          <h1>{`auto_maintenance  $${keys.auto_maintenance}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="auto_maintenance"
            defaultValue={keys.auto_maintenance}
          />
          <h1>{`home_maintenance  $${keys.home_maintenance}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="home_maintenance"
            defaultValue={keys.home_maintenance}
          />
          <h1>{`Medical  $${keys.medical}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="medical"
            defaultValue={keys.medical}
          />
          <h1>{`Clothing  $${keys.clothing}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="clothing"
            defaultValue={keys.clothing}
          />
          <h1>{`gifts  $${keys.gifts}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="gifts"
            defaultValue={keys.gifts}
          />
          <h1>{`Computer_Replacement  $${keys.computer_replacement}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="computer_replacement"
            defaultValue={keys.computer_replacement}
          />
          <h1>{`Student Loan  $${keys.student_loan}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="student_loan"
            defaultValue={keys.student_loan}
          />
          <h1>{`auto_loan  $${keys.auto_loan}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="auto_loan"
            defaultValue={keys.auto_loan}
          />
          <h1>{`Vacation  $${keys.vacation}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="vacation"
            defaultValue={keys.vacation}
          />
          <h1>{`Fitness  $${keys.fitness}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="fitness"
            defaultValue={keys.fitness}
          />
          <h1>{`Education  $${keys.education}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="education"
            defaultValue={keys.education}
          />
          <h1>{`Dining Out  $${keys.dining_out}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="dining_out"
            defaultValue={keys.dining_out}
          />
          <h1>{`gaming  $${keys.gaming}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="gaming"
            defaultValue={keys.gaming}
          />
          <h1>{`Fun Money  $${keys.fun_money}`}</h1>
          <input
            onChange={e => handleChange(e)}
            type="number"
            name="fun_money"
            defaultValue={keys.fun_money}
          />
          <h1>{`Date:${keys.dates}`}</h1>
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
    return <Budge>{mapped}</Budge>;
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
