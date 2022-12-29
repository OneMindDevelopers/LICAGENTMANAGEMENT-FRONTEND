import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import auth from "./services/authService";
import "./App.css";
import Login from "./forms/login";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import Register from "./forms/register";
import Logout from "./components/logout";
import Gallary from "./components/gallary";
import ForgotPassword from "./forms/forgotPassword";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <Navbar
          user={this.state.user}
          excelData={this.state.excelData}
          handleExcelData={this.handleExcelDataResponseFromNavBar}
        />

        <main className="container-fluid">
          <Switch>
            <Route path="/gallary" component={Gallary} />
            <Route path="/logout" component={Logout} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/forgotPassword" component={ForgotPassword} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Login} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
