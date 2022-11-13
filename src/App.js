import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import auth from './services/authService';
import './App.css';
import Movies from './components/movies';
import Login from './forms/login';
import Navbar from './components/navbar';
import NotFound from './components/not-found';
import Register from './forms/register';
import MoviesForm from './components/moviesForm';
import Logout from './components/logout';
import ProtectedRoute from './components/protectRoute';
//import ProtectedRoute from './components/protectRoute';



class App extends Component {
  state = {
  }

  componentDidMount = () => {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    return <div className="App">
      <Navbar user={this.state.user} />
      <main className="container">
        <Switch>
          <ProtectedRoute path="/movies/:id" component={MoviesForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route path="/register" component={Register} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Movies} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>;
  }
}

export default App;
