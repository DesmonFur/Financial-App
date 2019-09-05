import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { getBudgetExpenses, getBudgetBalanceInfo } from "../../ducks/reducer";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
import "./bud.css";
import { withRouter } from "react-router-dom";
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
    budget_id: 0,
    openCat1: false,
    openCat2: false,
    openCat3: false,
    openCat4: false,
    openCat5: false,
    total_inflow: 0,
    isLoading: undefined
  };

  edit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  cat1 = () => {
    const { openCat1 } = this.state;
    this.setState({
      openCat1: !openCat1
    });
  };

  cat2 = () => {
    const { openCat2 } = this.state;
    this.setState({
      openCat2: !openCat2
    });
  };

  cat3 = () => {
    const { openCat3 } = this.state;
    this.setState({
      openCat3: !openCat3
    });
  };

  cat4 = () => {
    const { openCat4 } = this.state;
    this.setState({
      openCat4: !openCat4
    });
  };

  cat5 = () => {
    const { openCat5 } = this.state;
    this.setState({
      openCat5: !openCat5
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
    const { budget_id } = this.state;

    axios.get(`/api/specificBudget/${budget_id}`).then(res => {
      // console.log("res.data", res.data);
      this.setState({
        balance: res.data[0].budget_balance,
        total_budgeted: res.data[0].total_budgeted
      });
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
      defaultBalance,
      previous_total
    } = this.state;
// eslint-disable-next-line
    for (let key in this.state) {
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
      }
    }

    this.dynamic();
    this.dynamic();
  };
  updateBalance = () => {
    const { expenses_id } = this.props.budget[0];

    this.updateExpenses(expenses_id);
    this.getExpensesProps();
    this.edit();
    this.total();
    this.dynamic();
  };

  getExpensesProps = () => {
    const { expenses_id } = this.props.budget[0];
    axios
      .get(`/api/getexpenses/${expenses_id}`)
      .then(res => {
        this.setState({
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
          budget_id: res.data[0].budget_id,
          total_budgeted: res.data[0].total_budgeted
        });
        // console.log(res.data);
      })
      .catch();
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
        this.getExpensesProps(res.data[0].expenses_id);
      });
  };

  getBalance = () => {
    axios
      .get("/api/sumUserBudgets")
      .then(res => {
        this.setState({
          total_inflow: res.data[0].sum
        });
      })
      .catch(() => console.log("hitttttt"));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]:
        e.target.type === "number" ? parseInt(e.target.value) : e.target.value
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps !== this.props) {
      // axios.get(`/api/getexpenses/${expenses_id}`).then(res => {
      //   const { data: expenses } = res;
      //   this.props.getBudgetExpenses({ expenses });
      // });
      this.getExpensesProps();
      this.getBalance();

      // console.log("this.props.expenses_id", this.props);
    }
  };
  render() {
    // console.log(this.props, "SDAFLJALFJSKFPJEAPFEJPJPJ");
    const {
      editing,
      budgets,
      balance,

      openCat1,
      openCat2,
      openCat3,
      openCat4,
      openCat5
    } = this.state;
    const { handleChange } = this;

    let mapped = budgets.map(keys => {
      return (
        <OneBudgets key={keys.expenses_id}>
          <h1 id="budget">{keys.budget_name}</h1>

          <div className="top-labels">
            <h6 id="category-label">Category</h6>
            <h6>Budgeted</h6>
            <h6>Activity</h6>
            <h6 id="available-label">Available</h6>
          </div>

          {!openCat1 ? (
            <div className="category-list" id="immediate-obligations">
              <Header onClick={this.cat1}>
                {" "}
                &#9658; Immediate Obligations
              </Header>
            </div>
          ) : (
            <div className="category-list" id="immediate-obligations">
              <Header onClick={this.cat1}>
                {" "}
                &#9660; Immediate Obligations
              </Header>
              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Rent/Mortage</h4>
                  <NumberFormat
                    value={keys.rent_or_mortgage}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.rent_or_mortgage}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Rent/Mortage</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="rent_or_mortgage"
                    defaultValue={keys.rent_or_mortgage}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.rent_or_mortgage}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Electric</h4>
                  <NumberFormat
                    value={keys.electric}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.electric}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Electric</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="electric"
                    defaultValue={keys.electric}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.electric}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Water</h4>
                  <NumberFormat
                    value={keys.water}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.water}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Water</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="water"
                    defaultValue={keys.water}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.water}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Internet</h4>
                  <NumberFormat
                    value={keys.internet}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.internet}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Internet</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="internet"
                    defaultValue={keys.internet}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.internet}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Groceries</h4>
                  <NumberFormat
                    value={keys.groceries}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.groceries}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Groceries</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="groceries"
                    defaultValue={keys.groceries}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.groceries}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Transportation</h4>
                  <NumberFormat
                    value={keys.transportation}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.transportation}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Transportation</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="transportation"
                    defaultValue={keys.transportation}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.transportation}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
            </div>
          )}
          {!openCat2 ? (
            <div className="category-list" id="true-expenses">
              <Header onClick={this.cat2}> &#9658; True Expenses</Header>
            </div>
          ) : (
            <div className="category-list" id="true-expenses">
              <Header onClick={this.cat2}> &#9660; True Expenses</Header>
              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Auto Maintenance</h4>
                  <NumberFormat
                    value={keys.auto_maintenance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.auto_maintenance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Auto Maintenance</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="auto_maintenance"
                    defaultValue={keys.auto_maintenance}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.auto_maintenance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Home Maintenance</h4>
                  <NumberFormat
                    value={keys.home_maintenance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.home_maintenance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>House Maintenance</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="home_maintenance"
                    defaultValue={keys.home_maintenance}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.home_maintenance}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Medical</h4>
                  <NumberFormat
                    value={keys.medical}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.medical}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Medical</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="medical"
                    defaultValue={keys.medical}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.medical}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Clothing</h4>
                  <NumberFormat
                    value={keys.clothing}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.clothing}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Clothing</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="clothing"
                    defaultValue={keys.clothing}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.clothing}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Gifts</h4>
                  <NumberFormat
                    value={keys.gifts}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.gifts}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Gifts</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="gifts"
                    defaultValue={keys.gifts}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.gifts}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Computer Replacement</h4>
                  <NumberFormat
                    value={keys.computer_replacement}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.computer_replacement}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Computer Replacement</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="computer_replacement"
                    defaultValue={keys.computer_replacement}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.computer_replacement}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
            </div>
          )}
          {!openCat3 ? (
            <div className="category-list" id="debt-payments">
              <Header onClick={this.cat3}> &#9658; Debt Payments</Header>
            </div>
          ) : (
            <div className="category-list" id="debt-payments">
              <Header onClick={this.cat3}> &#9660; Debt Payments</Header>

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Student Loan</h4>
                  <NumberFormat
                    value={keys.student_loan}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.student_loan}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4> Student Loan </h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="student_loan"
                    defaultValue={keys.student_loan}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.student_loan}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Auto Loan</h4>
                  <NumberFormat
                    value={keys.auto_loan}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.auto_loan}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Auto Loan</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="auto_loan"
                    defaultValue={keys.auto_loan}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.auto_loan}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
            </div>
          )}
          {!openCat4 ? (
            <div className="category-list" id="quality-of-life-goals">
              <Header onClick={this.cat4}> &#9658; Qualiy of life goals</Header>
            </div>
          ) : (
            <div className="category-list" id="quality-of-life-goals">
              <Header onClick={this.cat4}> &#9660; Qualiy of life goals</Header>

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Vacation</h4>
                  <NumberFormat
                    value={keys.vacation}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.vacation}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Vacation</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="vacation"
                    defaultValue={keys.vacation}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.vacation}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Fitness</h4>
                  <NumberFormat
                    value={keys.fitness}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.fitness}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Fitness</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="fitness"
                    defaultValue={keys.fitness}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.fitness}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Education</h4>
                  <NumberFormat
                    value={keys.education}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.education}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Education</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="education"
                    defaultValue={keys.education}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.education}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
            </div>
          )}
          {!openCat5 ? (
            <div className="category-list" id="just-for-fun">
              <Header onClick={this.cat5}> &#9658; Just for Fun</Header>
            </div>
          ) : (
            <div className="category-list" id="just-for-fun">
              <Header onClick={this.cat5}> &#9660; Just for Fun</Header>

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Dining Out</h4>
                  <NumberFormat
                    value={keys.dining_out}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.dining_out}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Dining Out</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="dining_out"
                    defaultValue={keys.dining_out}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.dining_out}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4>Gaming</h4>
                  <NumberFormat
                    value={keys.gaming}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.gaming}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Gaming</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="gaming"
                    defaultValue={keys.gaming}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.gaming}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}

              {!editing ? (
                <div className="rent-mortgage">
                  <h4> Fun Money </h4>
                  <NumberFormat
                    value={keys.fun_money}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="budgeted"
                    onDoubleClick={this.edit}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.fun_money}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              ) : (
                <div className="rent-mortgage">
                  <h4>Fun Money</h4>
                  <input
                    onChange={e => handleChange(e)}
                    type="number"
                    name="fun_money"
                    defaultValue={keys.fun_money}
                    onDoubleClick={this.updateBalance}
                  />
                  <NumberFormat
                    value={0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="activity"
                  />
                  <NumberFormat
                    value={keys.fun_money}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    id="available"
                  />
                </div>
              )}
            </div>
          )}

          <div className="budget-info">
            <h1 id="total-budgeted">
              Total Budgeted
              <br />
              <NumberFormat
                value={this.state.total_budgeted}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                id="number"
              />
            </h1>
            <hr />
            <h1 id="total-balance">
              Total Balance <br />
              <NumberFormat
                value={balance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                id="number"
              />
            </h1>
            <hr />
            <h1 id="total-inflow">
              total inflow
              <br />
              <NumberFormat
                value={this.state.total_inflow}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
                id="number"
              />
            </h1>
            <hr />
          </div>
        </OneBudgets>
      );
    });
    // console.log(this.state.rent_or_mortgage);
    return <Budge> {mapped} </Budge>;
  }
}

const Budge = styled.div`
  display: flex;
  flex-direction: row;
  color: black;
`;

const Header = styled.div`
  cursor: pointer;
  font-size: 18px;
`;

const OneBudgets = styled.div`
  display: flex;
  border-top: 1px solid gray;
  position: relative;
  /* right: 41vh; */
  top: 13vh;
  flex-direction: column;
  width: 86.4vw;
  /* border: 3px solid red; */
  /* overflow: auto */
`;

function mapStateToProps(reduxState) {
  const {
    budget_balance,
    totalExpenses,
    expenses,
    budget,
    expenses_id,
    budgets
  } = reduxState;
  return {
    budget_balance,
    totalExpenses,
    expenses,
    budget,
    expenses_id,
    budgets
  };
}

export default connect(
  mapStateToProps,
  { getBudgetBalanceInfo, getBudgetExpenses }
)(withRouter(OneBudget));
