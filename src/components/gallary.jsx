import React, { Component } from "react";
import ListGroup from "./list-group";
import Pagination from "./pagination";
import { paginate } from "./../utils/paginate";
import SearchBox from "./../forms/searchBox";
import BreadCrum from "./breadcrum/breadcrum";

class Gallary extends Component {
  state = {
    gallaries: [],
    pageSize: 9,
    currentPage: 1,
    catagories: [],
    searchQuery: "",
    selectedCatagory: { slno: "", brand: "All Brands" },
    excelData: null,
    excelErrorMessage: "",
    initialCount: 0,
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleCatagoryChange = (selectedCatagory) => {
    this.setState({ selectedCatagory, currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedCatagory: { slno: "", brand: "All Brands" },
      currentPage: 1,
    });
  };

  componentDidUpdate = (prevProps) => {
    const { excelData, excelErrorMessage } = this.props;
    if (excelData !== prevProps.excelData) {
      if (excelData && excelData.length) {
        const gallaries = [...excelData];
        const catagories = [{ slno: "", brand: "All Brands" }, ...gallaries];
        this.setState({ gallaries, catagories });
      }
      this.setState({ initialCount: this.state.initialCount + 1 });
    }
    if (excelErrorMessage !== prevProps.excelErrorMessage) {
      this.setState({ excelErrorMessage });
    }
  };

  render() {
    const {
      gallaries: allGallaries,
      pageSize,
      currentPage,
      catagories,
      selectedCatagory,
      searchQuery,
      excelErrorMessage,
      initialCount,
    } = this.state;
    let filtered = allGallaries;
    if (searchQuery) {
      filtered = allGallaries.filter((m) =>
        m.brand.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedCatagory && selectedCatagory.slno
          ? allGallaries.filter(
              (gallary) => gallary.name === selectedCatagory.name
            )
          : allGallaries;
    }
    const paginatedGallaries = paginate(filtered, currentPage, pageSize);

    if (excelErrorMessage && excelErrorMessage.length) {
      return (
        <div className="row background-image text-danger">
          <h1 className="m-1">{excelErrorMessage}</h1>
        </div>
      );
    }

    if (initialCount === 0)
      return (
        <div className="row background-image">
          <h1 className="m-1">
            There are no items in the pages Please upload the excel to file to
            view gallary
          </h1>
        </div>
      );

    return (
      <div className="row">
        <BreadCrum label={"gallary"} />
        <div className="col-3 background-image">
          <ListGroup
            items={catagories}
            selectedCatagory={selectedCatagory}
            onCatagoryChange={this.handleCatagoryChange}
          />
        </div>
        <div className="col-9 background-image">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          {paginatedGallaries.map((data) => (
            <div className="card card-style" key={data.slno}>
              <div className="card-body">
                <h5 className="card-title">{data.brand}</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
              </div>
            </div>
          ))}
          <Pagination
            items={filtered}
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
