import React, { Component } from "react";
import ListGroup from "./list-group";
import Pagination from "./pagination";
import { paginate } from "./../utils/paginate";
import SearchBox from "./../forms/searchBox";
import UploadExcelFile from "./uploadFile/uploadFile";
import SideBar from './sidebar';

class Gallary extends Component {
  state = {
    gallaries: [],
    pageSize: 9,
    currentPage: 1,
    catagories: [],
    searchQuery: "",
    selectedCatagory: { slno: "", brand: "All Brands" },
    excelData: null,
  };

  handlePageChange = (currentPage) => {
    this.setState({ currentPage });
  };

  handleCatagoryChange = (selectedCatagory) => {
    console.log("selectedCatagory", selectedCatagory);
    this.setState({ selectedCatagory, currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({
      searchQuery: query,
      selectedCatagory: { slno: "", brand: "All Brands" },
      currentPage: 1,
    });
  };

  handleExcelData = (responseExcelData) => {
    this.setState({ excelData: responseExcelData.data });
    const gallaries = [...this.state.excelData];
    const catagories = [{ slno: "", brand: "All Brands" }, ...gallaries];
    this.setState({ gallaries, catagories });
  };

  handleUploadExcelRepeat = () => {
    this.setState({ gallaries: [] });
  };

  render() {
    const {
      gallaries: allGallaries,
      pageSize,
      currentPage,
      catagories,
      selectedCatagory,
      searchQuery,
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

    if (paginatedGallaries.length === 0 || allGallaries.length === 0)
      return (
        <div className="row background-image">
          <UploadExcelFile onExcelData={this.handleExcelData} />
          <h1 className="m-1">
            There are no items in the pages Please upload the excel to file to
            view gallary
          </h1>
        </div>
      );

    return (
      <div className="row">
        {/* <SideBar/> */}
        <div className="col-3 background-image">
          <ListGroup
            items={catagories}
            selectedCatagory={selectedCatagory}
            onCatagoryChange={this.handleCatagoryChange}
          />
         
        </div>
        <div className="col-9 background-image">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <button
            className="btn btn-info m-3"
            onClick={this.handleUploadExcelRepeat}
          >
            Upload Excel
          </button>
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
