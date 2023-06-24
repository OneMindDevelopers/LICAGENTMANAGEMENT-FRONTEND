import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import UploadExcelFile from "../components/uploadFile/uploadFile";
import ItemContext from "../context/itemContext";

class NavBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="#">
          LIC AGENT MANAGEMENT APP
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/gallary">
                  Gallary
                </NavLink>
              </li>
            )} */}
            {!user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/agentRegister">
                    Agent Registration
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {user && (
              <li className="left-40em">
                <ItemContext.Consumer>
                  {(itemContext) => (
                    <UploadExcelFile
                      onExcelData={(data) => {
                        itemContext.handleExcelData(data);
                      }}
                      onExcelDataErrorMessage={(data) =>
                        itemContext.handleExcelDataErrorMessage(data)
                      }
                    />
                  )}
                </ItemContext.Consumer>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
