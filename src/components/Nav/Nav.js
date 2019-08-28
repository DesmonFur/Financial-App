import React, { Component } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import AllBudgetsList from "../AllBudgets/AllBudgetsList";
import Dashboard from "../DashBoard/Dashboard";
import styled from "styled-components";
import { CreateButton } from "../CreateBudget/CreateBudget";

export class Nav extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropDownClosed: true,
      sumBudgets: 0,
      allbudgets: true
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropDownClosed: !prevState.dropDownClosed,
      allbudgets: !prevState.allBudgets
    }));
  }

  logout = () => {
    axios.delete("/auth/logout").then(() => {
      this.props.history.push("/");
    });
  };

  allBudgetPush = () => {
    this.props.history.push("/allbudgets");
  };

  render() {
    console.log(this.props);
    const { email } = this.props;
    const { dropDownClosed, allbudgets } = this.state;
    return (
      <Contain>
        {/* <img src="" alt=""/> */}
        <RightTop>My Budget </RightTop>
        <RightTop>{email} </RightTop>
        <Link to="/">
          <Logout onClick={this.logout}>Logout</Logout>
        </Link>

        {this.props.location.pathname === "/allbudgets" ? (
          <div>
            <AlignBudgets onClick={this.allBudgetPush} location right>
              {" "}
              <img src="https://img.icons8.com/dotty/58/000000/bank-building.png"></img>{" "}
              <AllBudgetTab>All &nbsp; Budgets </AllBudgetTab>
            </AlignBudgets>
          </div>
        ) : (
          <AlignBudgets onClick={this.allBudgetPush} right>
            {" "}
            <img src="https://img.icons8.com/dotty/58/000000/bank-building.png"></img>{" "}
            <AllBudgetTab> All &nbsp; Budgets </AllBudgetTab>
          </AlignBudgets>
        )}

        {dropDownClosed ? (
          <div>
            <AlignNav onClick={this.toggle}>
              <img src="https://img.icons8.com/ios/50/000000/important-mail.png" />{" "}
              &#9655; Budget
              <Dashboard />
            </AlignNav>
          </div>
        ) : (
          <div>
            <AlignNav location onClick={this.toggle}>
              {" "}
              <img src="https://img.icons8.com/ios/50/000000/important-mail.png" />{" "}
              &#9661; Budget
              <Dashboard />
            </AlignNav>
            <div>
              <AllBudgetsList />
            </div>
          </div>
        )}

        <Link to="/createBudget">
          <Button>+ Add Budget</Button>
        </Link>
      </Contain>
    );
  }
}

function mapStateToProps(reduxState) {
  const { email, user_id } = reduxState;
  return { email, user_id };
}

const Image = styled.img`
  color: white;
`;

const AllBudgetTab = styled.span`
  position: relative;
  right: 3vw;
  top: 1vh;
`;

const RightTop = styled.span`
  position: relative;
  display: flex;
  justify-content: flex-start;
`;

const AlignNav = styled.span`
  display: flex;
  border-bottom: 0.1px solid grey;
  justify-content: ${props => (props.right ? "space-around" : "space-around")};
  background-color: ${props => (props.location ? "#00596F" : "")};
  cursor: pointer;
  color: white;
`;

const AlignBudgets = styled.span`
  display: flex;
  border-bottom: 0.1px solid grey;
  justify-content: space-between;
  cursor: pointer;
  color: white;
  background-color: ${props => (props.location ? "#00596F" : "")};
`;

const Logout = styled.span`
  color: white;
  display:flex;
  justify-content:flex-start;
`;

const Button = styled.button`
  /* display: inline-block; */
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #122c34;
  border-radius: 3px;
  cursor: pointer;
  width: 15vw;
  background: ${props => (props.primary ? "'#8AA5AD'" : "#F8F9FE")};
  color: ${props => (props.primary ? "black" : "black")};
  /* display: block; */
  font-size: .6em
  width: 5vw;
  &:hover {
    background-color: rgb(200, 249, 254);
  }
`;

const NavCreateTab = styled.button`
cursor: pointer;
text-decoration:none;
color:white
display:flex;
/* border:1px solid red; */
background-color:#56abbd;
width:8vw;
border-radius:40%;
&:hover {
  background-color:white;
  cursor: pointer;
text-decoration:none;
color:white
display:flex;
/* border:1px solid red; */
background:transparent;
width:8vw;
border-radius:60%;
} 
`;

const Contain = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 14%;
  height: 100vh;
  background-color: #2c97ad;
  position: absolute;
  border-right: 1px solid gray;
  /* width:50%; */
`;

export default connect(mapStateToProps)(withRouter(Nav));
