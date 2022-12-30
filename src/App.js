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
import ItemContext from "./context/itemContext";

class App extends Component {
  state = {
    user: null,
    excelData: null,
    excelErrorMessage: "",
  };

  componentDidMount = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  };

  handleExcelData = (excelResponse) => {
    this.setState({ excelData: excelResponse.data });
  };

  handleExcelDataErrorMessage = (excelErrorMessage) => {
    this.setState({ excelErrorMessage });
  };

  render() {
    const { user, excelData, excelErrorMessage } = this.state;
    return (
      <div className="App">
        <ItemContext.Provider
          value={{
            handleExcelData: this.handleExcelData,
            handleExcelDataErrorMessage: this.handleExcelDataErrorMessage,
          }}
        >
          <Navbar user={user} />
          <main className="container-fluid">
            <Switch>
              <Route
                path="/gallary"
                render={(props) => (
                  <Gallary
                    excelData={excelData}
                    excelErrorMessage={excelErrorMessage}
                    {...props}
                  />
                )}
              />
              <Route path="/logout" component={Logout} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/forgotPassword" component={ForgotPassword} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/" exact component={Login} />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </ItemContext.Provider>
      </div>
    );
  }
}

export default App;
