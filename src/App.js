import { Switch, Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import auth from "./services/authService";
import "./App.css";
import Login from "./forms/login";
import Navbar from "./components/navbar";
import NotFound from "./components/not-found";
import Register from "./forms/register";
import MoviesForm from "./components/moviesForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/protectRoute";
//import ProtectedRoute from './components/protectRoute';
import Gallary from "./components/gallary";
import LoginNavBar from "./components/loginNavBar";

class App extends Component {
  state = {};

  componentDidMount = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  };

  render() {
    return (
      <div className="App">
        {/* <Navbar user={this.state.user} /> */}
        <LoginNavBar />
        <main className="container-fluid">
          <Switch>
            {/* <ProtectedRoute path="/movies/:id" component={MoviesForm} />
            <Route path="/gallary" component={Gallary} />
            
            <Route path="/logout" component={Logout} />
             */}
            <Route path="/gallary" component={Gallary} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
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
