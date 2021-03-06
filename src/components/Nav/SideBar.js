import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class SideBar extends Component {
  state = {
    budgets: [],
    allBudgets: 0,
    text: {
      recipient: "",
      textmessage: ""
    }
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
          // console.log(
          //   res.data.map(b => b.budget_balance).reduce((acc, cv) => acc + cv)
          // );
          let all = res.data
            .map(b => b.budget_balance)
            .reduce((acc, cv) => acc + cv);
          this.setState({
            allBudgets: all
          });
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
      .catch(() => console.log("caught error"));
  }

  render() {
    const { allBudgets } = this.state;

    return (
      <div>
        {this.props.location !== "/allbudgets" ? (
          <HeaderRow>
            <div>
              {/* <h1>Calendar</h1> */}
            </div>
          </HeaderRow>
        ) : (
          <HeaderRow>
            <div>{/* <h1>Calendar</h1> */}</div>
            <BudgetBalance>
              <h1>Calendar</h1>
              <NumberFormat
                value={allBudgets}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
            </BudgetBalance>
          </HeaderRow>
        )}
        {/* <HeaderRow>
          <div><h1>Calendar</h1></div>
          <BudgetBalance>
            <NumberFormat
              value={allBudgets}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={2}
              fixedDecimalScale={true}
            />
          </BudgetBalance>
        </HeaderRow> */}
      </div>
    );
  }
}

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  width: 27vw;
  border-left: 1px solid grey;
  color: black;
  right: 0;
  top: 16vh;
  background: #e5f5f9;
  color: white;
  height: 84vh;
  align-items: center;
`;

const BudgetBalance = styled.div`
  background-color: ${props => (props.negative ? "rgb(211, 60, 45)" : "green")};
  height: 6vh;
  /* background-color: rgb(211, 60, 45); */
`;

function mapStateToProps(reduxState) {
  const { email, user_id, budgets } = reduxState;
  return { email, user_id, budgets };
}

export default connect(
  mapStateToProps
  // { getBudgetExpenses }
)(withRouter(SideBar));
