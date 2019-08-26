import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import NumberFormat from "react-number-format";
import Swal from "sweetalert2";
import { connect } from "react-redux";

export class SideBar extends Component {
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
      console.log('caught error')
      );
  }

  render() {
    const { allBudgets } = this.state;

    return (
      <div>
        <HeaderRow>
          <div>
            {/* <h1>Calendar</h1> */}
          </div>
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
        </HeaderRow>
      </div>
    );
  }
}

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  width: 20vw;
  border: 1px solid red;
  color: black;
  right: 0;
  top: 10vh;
  background: #e5f5f9;
  color: white;
  height: 90vh;
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
`;

function mapStateToProps(reduxState) {
  const { email, user_id, budgets } = reduxState;
  return { email, user_id, budgets };
}

export default connect(
  mapStateToProps
  // { getBudgetExpenses }
)(SideBar);
