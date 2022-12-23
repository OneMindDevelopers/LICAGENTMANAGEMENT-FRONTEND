import React, { Component } from "react";
import { getCatagories } from "../services/fakeCatagoryService";
import { getGallaries } from "../services/fakeGallaryService";
import ListGroup from "./list-group";
import Pagination from "./pagination";
import { paginate } from "./../utils/paginate";

class Gallary extends Component {
  state = {
    gallaries: [],
    pageSize: 9,
    currentPage: 1,
    catagories: [],
    selectedCatagory: { _id: "", name: "All Catagories" },
  };

  componentDidMount = () => {
    const catagories = [
      { _id: "", name: "All Catagories" },
      ...getCatagories(),
    ];
    const gallaries = [...getGallaries()];
    this.setState({ gallaries, catagories });
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleCatagoryChange = (selectedCatagory) => {
    this.setState({ selectedCatagory, currentPage: 1 });
  };

  render() {
    const {
      gallaries: allGallaries,
      pageSize,
      currentPage,
      catagories,
      selectedCatagory,
    } = this.state;
    const filteredGalary =
      selectedCatagory && selectedCatagory._id
        ? allGallaries.filter(
            (gallary) => gallary.catagory._id === selectedCatagory._id
          )
        : allGallaries;
    const paginatedGallaries = paginate(filteredGalary, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={catagories}
            selectedCatagory={selectedCatagory}
            onCatagoryChange={this.handleCatagoryChange}
          />
        </div>
        <div className="col-9">
          {paginatedGallaries.map((gallary) => (
            <div
              className="card"
              style={{ width: "18rem", float: "left", margin: "5px" }}
              key={gallary._id}
            >
              <div className="card-body">
                <h5 className="card-title">{gallary.title}</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          ))}
          <Pagination
            items={filteredGalary}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Gallary;
