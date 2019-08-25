import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import AllBudgetsList from "../AllBudgets/AllBudgetsList";
import Dashboard from "../DashBoard/Dashboard";
import styled from "styled-components";

export class Nav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropDownClosed: true,
      sumBudgets: 0
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropDownClosed: !prevState.dropDownClosed
    }));
  }

  logout = () => {
    axios.delete("/auth/logout").then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    console.log(this.props);
    const { email } = this.props;
    const { dropDownClosed } = this.state;
    return (
      <Contain>
        {/* <img src="" alt=""/> */}
        <span>My Budget </span>
        <span>{email} </span>
        <Link to="/">
          <button onClick={this.logout}>Logout</button>
        </Link>
        <Link to="/dashboard">
          <button> Dashboard</button>
        </Link>
        <Link to={"/allbudgets"}>
          <button> AllBudgets </button>
        </Link>

        {dropDownClosed ? (
          <div>
            <AlignNav onClick={this.toggle}>
              &#9655; Budget
              <Dashboard />
            </AlignNav>
          </div>
        ) : (
          <div>
            <AlignNav onClick={this.toggle}>
              {" "}
              &#9661; Budget
              <Dashboard />
            </AlignNav>
            <div>
              <AllBudgetsList />
            </div>
          </div>
        )}

        <Link to="/createBudget">
          <button> Create Budget</button>
        </Link>
      </Contain>
    );
  }
}

function mapStateToProps(reduxState) {
  const { email, user_id } = reduxState;
  return { email, user_id };
}

const AlignNav = styled.span`
  display: flex;
  border: 1px solid red;
  justify-content: space-around;
  cursor: pointer;
`;

const Contain = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 20%;
  height: 100vh;
  background-color: #2c97ad;
  position: absolute;
  /* width:50%; */
`;

export default connect(mapStateToProps)(withRouter(Nav));
