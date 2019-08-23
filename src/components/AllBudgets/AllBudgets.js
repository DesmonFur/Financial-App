import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import OneBudget from ".././OneBudget/OneBudget";
import { Button } from "../LandingPage/Landing";
import { getExpenseId, expenseFn, getBudget } from "../../ducks/reducer";
import { connect } from "react-redux";
import Chart from "chart.js";
import { Pie, Line } from "react-chartjs-2";
class AllBudgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      expenses: [],
      data: {
        labels: ["1", "2", "3", '4', '5'],
        datasets: [
          {
            label: "videos mades",
            backgroundColor: "rgba(100,0,200,155)",
            data: [90, 11, 22, 24, 43, 55, 50]
          },
          {
            label: "Subscriptions",
            backgroundColor: "rgba(255,0,200,0.75)",
            data: [4, 5, 6, 424, 8, 13, 40]
          }
        ]
      }
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
      console.log("res.data", res.data);
      const { data: budget } = res;
      this.props.getBudget({ budget });
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
  
  setGradientColor = (canvas,color) => {
    const ctx = canvas.getContext('2d')
    const gradient = ctx.createLinearGradient(0,0,600,550)
    gradient.addColorStop(0, 'red')
    gradient.addColorStop(0.95, 'blue')
    return gradient
  }

  getChartData = canvas => {
    const data = this.state.data;
    if(data.datasets)
    {
      let colors = ["rgba(255,0,200,0.75)"]
      data.datasets.forEach((set, i) => {
        set.backgroundColor = this.setGradientColor(canvas,colors[i])
        set.borderColor = 'white';
        set.borderWidth = 2;
      })
    }
    return data
  }

  render() {
    const { editing, expenses, budgets } = this.state;
    // console.log('total budgeted',budget.total_budgeted)
    console.log("user budgets", budgets);
    // console.log("all props", this.props);
    // console.log("budgets", this.state.budgets);
    console.log("expenses", this.state.expenses);
    // console.log("everything", this.state.budgets[0].expenses_id);

    let mappedBudgets = budgets.map(budget => {
      const { budget_name, budget_balance, budget_id } = budget;
      console.log(budget_id);
      return (
        <div style={{position: 'relative', width:600, height:550}} key={budget.budget_id}>
          {/* console.log(budgets) */}
          {/* <Button onClick={this.updateExpenses}>POST UPDATE TO EXPENSES</Button> */}

          <h1 onClick={this.dynamic}> {budget_name}</h1>
          <h1 onClick={this.balance}> Budget Balance:{budget_balance}</h1>
          {/* <button onClick={this.getAllBudgets}> AllBudgets </button> */}
          <Button onClick={() => this.deleteBudget(budget_id)}>delete</Button>
          <Link to={"/onebudget"}>
            <Button onClick={() => this.pickBudget(budget_id)}>
              CHOOSE BUDGET
            </Button>
          </Link>

          <Line
            options={{
              responsive: true
            }}
            data={this.getChartData}
          />
        </div>
      );
    });

    return (
      <div>
        {mappedBudgets}
        {/* <canvas id='myChart' width='400' height='400'>ssdf</canvas> */}
        {/* {mapped} */}
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  console.log("reduxstate", reduxState);
  const { user_id, budget } = reduxState;
  return { user_id, budget };
}

export default connect(
  mapStateToProps,
  { getExpenseId, getBudget }
)(AllBudgets);
