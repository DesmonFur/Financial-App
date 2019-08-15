import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
export class Nav extends Component {
  logout = () => {
    axios.delete("/auth/logout").then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    console.log(this.props);
    const {email, user_id} = this.props
    return (
      <div>
      <img src="expense" alt=""/>
        <span>Welcome {email}</span>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { email, user_id } = reduxState;
  return { email, user_id };
}

export default connect(mapStateToProps)(withRouter(Nav));
