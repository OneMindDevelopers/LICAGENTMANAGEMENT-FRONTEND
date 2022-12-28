import { NavLink } from "react-router-dom";
import React, { Component } from "react";
import * as uploadService from "../services/uploadService";

class NavBar extends Component {
  state = {
    excelFile: null,
    excelFileError: null,
  };

  fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && this.fileType.includes(selectedFile.type)) {
        this.setState({ excelFile: selectedFile });
      } else {
        this.setState({
          excelFileError: "Please select only excel file types",
          excelFile: null,
        });
      }
    } else {
      console.log("plz select your file");
    }
  };

  handleSubmit = async (e) => {
    const { excelFile } = this.state;
    e.preventDefault();
    if (excelFile !== null) {
      const formData = new FormData();
      console.log("excelfile", excelFile);
      formData.append("xlsx", excelFile);
      const excelResponseData = await uploadService.uploadFile(formData);
      if (excelResponseData) {
        this.props.handleExcelData(excelResponseData);
      }
    }
  };

  render() {
    const { user, excelData } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-right">
        <NavLink className="navbar-brand" to="#">
          LIC AGENT MANAGEMENT APP
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/gallary">
                  Gallary
                </NavLink>
              </li>
            )}
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
                  <NavLink className="nav-link" to="/gallary">
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </React.Fragment>
            )}
            {excelData && (
              <React.Fragment>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.handleFile}
                />
                <div>
                  <button onClick={this.handleSubmit}>Submit</button>
                </div>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
