import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { connect } from "react-redux";

export class HeaderBar extends Component {
  state = {
    budgets: [],
    allBudgets: 0
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
      .catch(() =>
        Swal.fire("Welcome to Xpense!", "First things first, Create a budget")
      );
  }

  render() {
    const { allBudgets } = this.state;

    return (
      <div>
        <HeaderRow>
          <div>
            <h1>Calendar</h1>
          </div>
          {allBudgets > 0 ? (
            <BudgetBalance>
              <NumberFormat
                value={allBudgets}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={2}
                fixedDecimalScale={true}
              />
                 <SpanBox annotation>To be Budgeted</SpanBox>
            </BudgetBalance>
          ) : (
            <BudgetBalance negative>
              <SpanBox>
                <NumberFormat
                  value={allBudgets}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  decimalScale={2}
                  fixedDecimalScale={true}
                />
              </SpanBox>
              <SpanBox annotation>To be Budgeted</SpanBox>
            </BudgetBalance>
          )}
        </HeaderRow>
      </div>
    );
  }
}

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 80vw;
  border: 1px solid red;
  color: black;
  left: 20vw;
  background: #003540;
  color: white;
  height: 10vh;
  align-items: center;
`;

const SpanBox = styled.span`
  font-size: ${props => (props.annotation ? "12px" : "30px")};
  font-style: ${props => (props.annotation ? "italic" : "normal")};
  color: ${props => (props.annotation ? "black" : "normal")};
`;
const BudgetBalance = styled.div`
  background-color: ${props => (props.negative ? "rgb(211, 60, 45)" : "green")};
  height: 6vh;
  /* background-color: rgb(211, 60, 45); */
  border-bottom-left-radius: 7.2px;
  border-bottom-right-radius: 7.2px;
  border-top-left-radius: 7.2px;
  border-top-right-radius: 7.2px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  display: flex;
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 1;
  font-size: 14.4px;
  height: 70.5469px;
  letter-spacing: normal;
  max-height: 70.56px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 7.2px;
  padding-left: 10.8px;
  padding-right: 10.8px;
  padding-top: 7.92px;
  /* text-align: center;
  text-rendering: auto; */
  text-size-adjust: 100%;
  width: 222.109px;
  font-size: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* -webkit-box-flex: 1;
-webkit-font-smoothing: subpixel-antialiased; */
`;

function mapStateToProps(reduxState) {
  const { email, user_id, budgets } = reduxState;
  return { email, user_id, budgets };
}

export default connect(
  mapStateToProps
  // { getBudgetExpenses }
)(HeaderBar);