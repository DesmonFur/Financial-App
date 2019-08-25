import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "./ducks/reducer";
import OneBudget from "./components/OneBudget/OneBudget";
import HeaderBar from "./components/Nav/HeaderBar";
import styled from "styled-components";
import { SideBar } from "./components/Nav/SideBar";
export class App extends Component {
  componentDidMount() {
    axios.get("/auth/session").then(res => {
      try {
        this.props.setUser(res.data.user);
        // console.log("USER SESSION", res.data);
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
        <div>
          {location.pathname === "/" ? (
            <> </>
          ) : (
            <div>
              <Nav />

        <HeaderBar />
        <SideBar />
            </div>
          )}
        </div>
        <div>{location.pathname === "/dashboard" ? <OneBudget /> : <> </>}</div>
        {/* <OneBudget /> */}
        {routes}
      </div>
    );
  }
}
const Headers = styled.div`
  display: flex;
  background-color: black;
  border: 1px solid red;
  width: 100vw;
  height: 100vh;
  justify-content: space-between;
`;

export default connect(
  null,
  { setUser }
)(withRouter(App));
