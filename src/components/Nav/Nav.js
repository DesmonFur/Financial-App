import React, { Component } from "react";
import axios from "axios";
import { withRouter,Link } from "react-router-dom";
import { connect } from "react-redux";
export class Nav extends Component {
  logout = () => {
    axios.delete("/auth/logout").then(() => {
      this.props.history.push("/");
    });
  };

  render() {
    // console.log(this.props);
    const {email} = this.props
    return (
      <div>
      {/* <img src="" alt=""/> */}
        <span>Welcome {email}</span>
        <button onClick={this.logout}>Logout</button>
         <Link to="/dashboard">
         <button> Dashboard</button>
       </Link>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { email, user_id } = reduxState;
  return { email, user_id };
}

export default connect(mapStateToProps)(withRouter(Nav));
