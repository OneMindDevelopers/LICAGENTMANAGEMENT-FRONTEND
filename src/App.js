import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import auth from "./services/authService";
import "./App.css";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import Logout from "./components/logout";
import Gallary from "./components/gallary";
import ForgotPassword from "./forms/forgotPassword";
import ItemContext from "./context/itemContext";
import AdminLogin from "./forms/adminLogin";
import AdminRegistration from "./forms/adminRegister";
import AgentRegistration from "./forms/agentRegister";
import BillingPage from "./components/billingPage";
import Thankyou from "./components/thankyou";
import Demo from "./components/demo1";
import BillingItemsContext from "./context/BillingItemsContext";
import BillingSectionComponent from "./components/billingSection";

class App extends Component {
  state = {
    user: null,
    excelData: null,
    excelErrorMessage: "",
    customername: "abhi",
    selectedBillingItems: [],
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

  handleSelectedItems = (selectedItems) => {
    this.setState({ selectedBillingItems: selectedItems });
  };

  render() {
    console.log("selectedItems app 123", this.state.selectedBillingItems);
    const { user, excelData, excelErrorMessage } = this.state;
    return (
      <div className="App">
        <BillingItemsContext.Provider value={this.state.selectedBillingItems}>
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
                      onSelectItems={this.handleSelectedItems}
                      {...props}
                    />
                  )}
                />
                <Route path="/thankyou" component={Thankyou} />
                {/* <Route
                path="/thankyou/:id"
                render={(props) => {
                  <Thankyou
                    customername={this.state.customername}
                    {...props}
                  />;
                }}
              /> */}
                <Route path="/demo1" component={Demo} />
                <Route path="/logout" component={Logout} />
                <Route path="/register" component={AdminRegistration} />
                <Route path="/agentRegister" component={AgentRegistration} />
                <Route path="/login" component={AdminLogin} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                {/* <Route path="/billing" component={BillingPage} /> */}
                {/* <Route
                  path="/billing"
                  render={(props) => (
                    <BillingPage
                      billingItems={this.state.selectedBillingItems}
                      {...props}
                    />
                  )}
                /> */}
                <Route path="/billing" component={BillingSectionComponent} />
                <Route path="/not-found" component={NotFound} />
                <Route path="/" exact component={AdminLogin} />
                <Redirect to="/not-found" />
              </Switch>
            </main>
          </ItemContext.Provider>
        </BillingItemsContext.Provider>
      </div>
    );
  }
}

export default App;
