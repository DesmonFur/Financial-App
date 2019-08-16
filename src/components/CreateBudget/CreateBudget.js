import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "../LandingPage/Landing.js";
import { connect } from "react-redux";
import axios from "axios";
import { setUser } from "../../ducks/reducer";

export class createBudget extends Component {
  state = {
    budget_balance: 0,
    budget_name: ""
  };

  postBudget = () => {
    const { budget_balance, budget_name } = this.state;
    const { user_id, email,budgets } = this.props;
    console.log(this.props);
    axios
      .post("/api/createBudget", { user_id, budget_name, budget_balance })
      .then(res => {
        const { data } = res;
        let ref = data;
        console.log("res.data/budgets", ref);
        this.props.setUser({email, user_id, budgets});
      });
    // axios.get(`/api/budgets/${user_id}`).then(res => {
    //   const {data} = res
    //   console.log('data',data);
    //   console.log('props',budgets);
    // });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>Create Budget </h1>
        <h3>Budget_Name</h3>
        <input onChange={this.handleChange} type="text" name="budget_name" />
        <h3>Budget_Balance</h3>
        <input onChange={this.handleChange} type="text" name="budget_balance" />
        <Link to="/dashboard">
          <Button onClick={this.postBudget}>Create Budget</Button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { user_id, email } = reduxState;
  return { user_id, email };
}
export default connect(
  mapStateToProps,
  { setUser }
)(createBudget);
