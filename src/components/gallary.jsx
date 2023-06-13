import React, { Component } from "react";
import ListGroup from "./list-group";
import Pagination from "./pagination";
import { paginate } from "./../utils/paginate";
import SearchBox from "./../forms/searchBox";
import BreadCrum from "./breadcrum/breadcrum";
import BillingPage from "../forms/billingPage";

class Gallary extends Component {
  state = {
    gallaries: [],
    selectedItems: [],
    pageSize: 9,
    currentPage: 1,
    catagories: [],
    searchQuery: "",
    selectedCatagory: { slno: "", brand: "All Brands" },
    excelData: null,
    excelErrorMessage: "",
    initialCount: 0,
    isNavigateToBillingComponent: false,
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

  handleAdditionItem = (selectedItem) => {
    const gallaries = [...this.state.gallaries];
    const index = gallaries.indexOf(selectedItem);
    gallaries[index].quantity = gallaries[index].quantity + 1;

    this.setState({ gallaries });
  };

  handleDeletionItem = (selectedItem) => {
    const gallaries = [...this.state.gallaries];
    const index = gallaries.indexOf(selectedItem);
    gallaries[index].quantity = gallaries[index].quantity - 1;
    this.setState({ gallaries });
  };

  handleItemSelection = (event, item) => {
    const isChecked = event.target.checked;
    let selectedItems = [...this.state.selectedItems];
    if (isChecked) {
      this.setState({ selectedItems: this.state.selectedItems.concat(item) });
    } else {
      const filteredItems = selectedItems.filter(
        (selectedItem) => selectedItem.slno !== item.slno
      );
      this.setState({ selectedItems: filteredItems });
    }
  };

  navigateToBillingComponent = () => {
    this.props.onSelectItems(this.state.selectedItems);
    window.location = "/billing";
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
          {/* {paginatedGallaries.map((data) => (
            <h1 onClick={(data)=>{this.handleDemo(data)}}>{data.brand}</h1>
          ))} */}
          {paginatedGallaries.map((item) => (
            <div className="card card-style" key={item.slno}>
              <div className="card-body">
                <h5 className="card-title">{item.brand}</h5>
                <input
                  type="checkbox"
                  onChange={(event) => {
                    this.handleItemSelection(event, item);
                  }}
                />
                <p className="card-text">
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-plus-fill"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    this.handleAdditionItem(item);
                  }}
                >
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                </svg>
                <input type="text" className="width-40" value={item.quantity} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-file-minus-fill"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    this.handleDeletionItem(item);
                  }}
                >
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 7.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1z" />
                </svg>
                <p>Size: {item.size}</p>
                <p>Price: {item.price}</p>
              </div>
            </div>
          ))}

          <Pagination
            items={filtered}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
          <button onClick={this.navigateToBillingComponent}>
            Continue to Billing Page
          </button>
        </div>
      </div>
    );
  }
}

export default Gallary;
