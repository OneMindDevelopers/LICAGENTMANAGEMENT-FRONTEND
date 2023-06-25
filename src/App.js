import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import auth from "./services/authService";
import "./App.css";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import Logout from "./components/logout";
import ForgotPassword from "./forms/forgotPassword";
import ItemContext from "./context/itemContext";
import AdminLogin from "./forms/adminLogin";
import AdminRegistration from "./forms/adminRegister";
import AgentRegistration from "./forms/agentRegister";
import BillingItemsContext from "./context/BillingItemsContext";
import ItemPreviewComponent from "./components/itemPreviewComponent";
import GallarySection from "./components/gallarysection";
import ItemConfirmationSectionComponent from "./components/itemConfirmationComponent";

class App extends Component {
  state = {
    user: null,
    excelData: null,
    excelErrorMessage: "",
    customername: "abhi",
    selectedBillingItems: [],
    editBillingItems: [],
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

  handleEditOptionBillingPage = (editBillingItems) => {
    this.setState({ editBillingItems });
  };

  render() {
    const { user, excelData, excelErrorMessage, editBillingItems } = this.state;
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
                    <GallarySection
                      excelData={excelData}
                      excelErrorMessage={excelErrorMessage}
                      editBillingItems={editBillingItems}
                      onSelectItems={this.handleSelectedItems}
                      {...props}
                    />
                  )}
                />

                <Route path="/logout" component={Logout} />
                <Route path="/register" component={AdminRegistration} />
                <Route path="/agentRegister" component={AgentRegistration} />
                <Route path="/login" component={AdminLogin} />
                <Route path="/forgotPassword" component={ForgotPassword} />
                <Route
                  path="/confirm"
                  component={ItemConfirmationSectionComponent}
                />

                <Route
                  path="/preview"
                  render={(props) => (
                    <ItemPreviewComponent
                      OnEditOptionBillingPage={this.handleEditOptionBillingPage}
                      {...props}
                    />
                  )}
                />
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
