import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import AllBudgets from "../AllBudgets/AllBudgets";
// import { getBudgetExpenses } from "../../ducks/reducer.js";
export class Dashboard extends Component {
  state = {
    budgets: [],
    allBudgets: 0,
    sumBudgets: 0
  };

  getSum = () => {
    const { user_id } = this.props;
    console.log(user_id);
    axios.get("/api/sumUserBudgets").then(res => {
      console.log(res.data[0].sum);

      this.setState({
        sumBudgets: res.data[0].sum
      });
    });
  };

  componentDidMount() {
    const { user_id, budgets } = this.props;
    axios
      .get(`/api/getUserBudgets/${user_id}`)
      .then(res => {
        this.setState({
          budgets: res.data
        });
        if (budgets !== undefined || budgets !== 2) {
          console.log(
            res.data.map(b => b.budget_balance).reduce((acc, cv) => acc + cv)
          );
          let all = res.data
            .map(b => b.budget_balance)
            .reduce((acc, cv) => acc + cv);
          this.setState({
            allBudgets: all
          });
          this.getSum();
        }

        // const data = this.state.data;

        // if(data.datasets)
        // {
        //   let colors = ["rgba(255,0,200,0.75)"]
        //   data.datasets.forEach((set, i) => {
        //     set.backgroundColor = this.setGradientColor(canvas,colors[i])
        //     set.borderColor = 'white';
        //     set.borderWidth = 2;
        //   })
        // }
        // return data
      })
      .catch(() => console.log("no worries"));
  }

  render() {
    const { allBudgets, sumBudgets } = this.state;

    console.log(this.props);
    console.log(sumBudgets);

    return (
      <div>
        <div>
          <NumberFormat
            value={sumBudgets}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
          {/* <Link to="/createBudget">
            <button> Create Budget</button>
          </Link>
          <Link to="/allbudgets">
            <button onClick={this.getAllBudgets}> AllBudgets </button>
          </Link> */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { email, user_id, budgets } = reduxState;
  return { email, user_id, budgets };
}

export default connect(
  mapStateToProps
  // { getBudgetExpenses }
)(Dashboard);
