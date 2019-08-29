import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { getExpenseId, expenseFn, getBudget } from "../../ducks/reducer";
import { connect } from "react-redux";
import NumberFormat from "react-number-format";
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

  pickBudget = budget_id => {
    // const { email, user_id, budgets, props } = this.props;
    console.log(budget_id);
    axios.get(`/api/specificBudget/${budget_id}`).then(res => {
      console.log("res.data", res.data);
      const { data: budget } = res;
      this.props.getBudget({ budget });
    });
  };

  componentDidMount() {
    this.getAllBudgets();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      // this.getExpensesProps();
      this.getAllBudgets();
    }
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
    // console.log("user budgets", budgets);
    // console.log("all props", this.props);
    // console.log("budgets", this.state.budgets);
    // console.log("expenses", this.state.expenses);
    // console.log("everything", this.state.budgets[0].expenses_id);
    // console.log(this.props);
    let mappedBudgets = budgets.map(budget => {
      const { budget_name, budget_balance, budget_id } = budget;
      console.log(budget_id);
      return (
        <BudgetInfo key={budget.budget_id}>
          {/* console.log(budgets) */}
          {/* <Button onClick={this.updateExpenses}>POST UPDATE TO EXPENSES</Button> */}
          <Link to="/dashboard">
            <ShowExpenses Button onClick={() => this.pickBudget(budget_id)}>
              {" "}
              {budget_name}
            </ShowExpenses>
          </Link>
          {/* <span onClick={this.balance}> {budget_balance}</span> */}
          {/* <Button onClick={() => this.deleteBudget(budget_id)}>delete</Button> */}
          <NumberFormat
            value={budget_balance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
          {/* <button onClick={this.getAllBudgets}> AllBudgets </button> */}
          {/* <Link to={"/onebudget"}> */}
          {/* <Button onClick={() => this.pickBudget(budget_id)}>
            CHOOSE BUDGET
          </Button> */}
          {/* </Link> */}
        </BudgetInfo>
      );
    });

    return <div>{mappedBudgets}</div>;
  }
}

const BudgetInfo = styled.div`
  display: flex;
  border-bottom: 1px solid grey;
  justify-content: space-between;
  position: relative;
  /* font-weight: bold; */
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`;

const ShowExpenses = styled.span`
  color: white;
`;

function mapStateToProps(reduxState) {
  /* console.log("reduxstate", reduxState); */
  const { user_id, budget } = reduxState;
  return { user_id, budget };
}

export default connect(
  mapStateToProps,
  { getExpenseId, getBudget }
)(AllBudgets);
