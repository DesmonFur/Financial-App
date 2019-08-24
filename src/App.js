import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "./ducks/reducer";
import OneBudget from "./components/OneBudget/OneBudget";

export class App extends Component {
  componentDidMount() {
    axios.get("/auth/session").then(res => {
      try {
        this.props.setUser(res.data.user);
        console.log("USER SESSION", res.data);
      } catch {
        console.log("USER NEEDS TO LOG IN");
        this.props.history.push("/");
      }
    });
  }

  render() {
    const { location } = this.props;
    return (
      <div className="App">
        <div>{location.pathname === "/" ? <> </> : <Nav />}</div>

        {routes}
        <OneBudget />
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(withRouter(App));
