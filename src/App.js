import React, { Component } from "react";
import "./App.css";
import routes from "./routes";
import Nav from "./components/Nav/Nav";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux'
import {setUser} from './ducks/reducer'

export class App extends Component {

  state = {
    email: ''
  }

  componentDidMount() {
    axios.get("/auth/session").then(res => {
      const {email} = this.state
      this.props.setUser(res.data);
      console.log(res.data)
    });
  }

  render() {
    const { location } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <div>
            {location.pathname === "/" 
             ? (
              <> </>
            ) : (
              <Nav />
            )}
          </div>
        </header>
        {routes}
      </div>
    );
  }
}

export default  connect(null,
  {setUser})(withRouter(App));
