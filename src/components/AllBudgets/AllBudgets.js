import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { getExpenseId, expenseFn, getBudget } from "../../ducks/reducer";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import Swal from "sweetalert2";
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
    const swag = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swag
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, remove this nonsense!",
        cancelButtonText: "No, I need it!",
        reverseButtons: true
      })
      .then(result => {
        if (result.value) {
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
          swag.fire("Deleted!", "Your file has been deleted.", "success");
          window.location.reload()
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swag.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
    // axios
    //   .delete(`/api/deleteBudget/${budget_id}/${user_id}`)
    //   .then(
    //     axios.get(`/api/budgets/${user_id}`).then(res => {
    //       // console.log(res.data);
    //       this.setState({
    //         budgets: res.data
    //       });
    //     })
    //   )
    //   .catch(err => alert("failled to delete"));
  };

  pickBudget = budget_id => {
    // const { email, user_id, budgets, props } = this.props;
    console.log(budget_id);
    axios.get(`/api/specificBudget/${budget_id}`).then(res => {
      console.log("res.data", res.data);
      const { data: budget } = res;
      this.props.getBudget({ budget });
    });
    this.props.history.push("/dashboard");
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
    console.log("user budgets", budgets);
    // console.log("all props", this.props);
    // console.log("budgets", this.state.budgets);
    console.log("expenses", this.state.expenses);
    // console.log("everything", this.state.budgets[0].expenses_id);
    console.log(this.props);
    let mappedBudgets = budgets.map(budget => {
      const { budget_name, budget_balance, budget_id, creation_date } = budget;
      console.log(budget_id);
      return (
        <BudgetInfo key={budget.budget_id}>
          {/* console.log(budgets) */}
          {/* <Button onClick={this.updateExpenses}>POST UPDATE TO EXPENSES</Button> */}
          {/* <Link to='/'> */}
          <BudgetTitle Button onClick={() => this.pickBudget(budget_id)}>
            {" "}
            {budget_name}
          </BudgetTitle>
          {/* </Link> */}
          <h4>{creation_date}</h4>
          {/* <span onClick={this.balance}> {budget_balance}</span> */}

          <NumberFormat
            value={budget_balance}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            decimalScale={2}
            fixedDecimalScale={true}
          />
          <Delete onClick={() => this.deleteBudget(budget_id)}>&#10008;</Delete>
        </BudgetInfo>
      );
    });

    return (
      <div>
        <Header>
          <Heading>Account</Heading>
          <Heading>Date</Heading>
          <Heading>Inflow</Heading>
          <Heading>Remove</Heading>
        </Header>
        {mappedBudgets}
      </div>
    );
  }
}

const BudgetInfo = styled.div`
  display: flex;
  border: 1px solid red;
  justify-content: space-between;
  position: relative;
  right: 20vw;
  top: 15vh;
  width: 60vw;
  color: black;
  background-color:rgb(229, 245, 249);
  align-items: center;
  align-content:center;
`;

const Heading = styled.h5`
  color: black;
`;

const Header = styled.div`
  display: flex;
  border: 1px solid red;
  position: absolute;
  top: 10vh;
  width: 60vw;
  left: 20vw;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(229, 245, 249) ;
`;

const Delete = styled.span`
  cursor: pointer;
`;

const BudgetTitle = styled.h4`
  cursor: pointer;
`;

function mapStateToProps(reduxState) {
  console.log("reduxstate", reduxState);
  const { user_id, budget } = reduxState;
  return { user_id, budget };
}

export default connect(
  mapStateToProps,
  { getExpenseId, getBudget }
)(AllBudgets);
