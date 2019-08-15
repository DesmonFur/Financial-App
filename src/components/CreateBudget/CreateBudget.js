import React, { Component } from "react";
import {Link } from "react-router-dom";
export class createBudget extends Component {
  render() {
    return (
      <div>
        <h1>Create Budget </h1>
        <Link to="/dashboard">
          <button>toDashboard</button>
        </Link>
      </div>
    );
  }
}

export default createBudget;
