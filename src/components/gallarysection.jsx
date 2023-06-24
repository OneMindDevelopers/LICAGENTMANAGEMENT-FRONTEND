import React, { useContext, useEffect, useState } from "react";
import { paginate } from "../utils/paginate";
import BreadCrum from "./breadcrum/breadcrum";
import ListGroup from "./list-group";
import SearchBox from "../forms/searchBox";
import Pagination from "./pagination";
import BillingItemsContext from "../context/BillingItemsContext";

const GallarySection = ({
  excelData,
  excelErrorMessage,
  editBillingItems,
  history,
  onSelectItems,
}) => {
  const billingItemsContext = useContext(BillingItemsContext);
  const [gallaries, setGallaries] = useState([]);
  const [paginatedGallaries, setPaginatedGallaries] = useState([]);
  const [filteredGallaries, setFilteredGallaries] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [pageSize, setPageSize] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [catagories, setCatagories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [importExcelData, setImportExcelData] = useState([]);
  const [selectedCatagory, setSelectedCatagory] = useState({
    slno: "",
    brand: "All Brands",
  });
  const [initialCount, setInitialCount] = useState(0);
  const [isNavigateToBillingComponent, setIsNavigateToBillingComponent] =
    useState(false);
  const [isItemModified, setIsItemModified] = useState(false);

  const handlePageChange = (currentPage) => {
    setCurrentPage(currentPage);
  };

  const handleCatagoryChange = (selectedCatagory) => {
    setSelectedCatagory(selectedCatagory);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCatagory({ slno: "", brand: "All Brands" });
    setCurrentPage(1);
  };

  useEffect(() => {
    if (excelData && excelData.length) {
      setImportExcelData(excelData);
      const gallaries = [...excelData];
      const catagories = [{ slno: "", brand: "All Brands" }, ...gallaries];
      //this.setState({ gallaries, catagories });
      setGallaries(gallaries);
      setCatagories(catagories);
      setInitialCount(initialCount + 1);
    }
  }, [excelData, excelErrorMessage]);

  const handleAdditionItem = (selectedItem) => {
    setIsItemModified(true);
    const index = gallaries.indexOf(selectedItem);
    gallaries[index].quantity = gallaries[index].quantity + 1;
    setGallaries(gallaries);

    let filtered = [...gallaries];
    if (searchQuery) {
      filtered = gallaries.filter((m) =>
        m.brand.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedCatagory && selectedCatagory.slno
          ? gallaries.filter(
              (gallary) => gallary.name === selectedCatagory.name
            )
          : gallaries;
    }
    setFilteredGallaries(filtered);
    const paginatedGallaries = paginate(filtered, currentPage, pageSize);
    setPaginatedGallaries(paginatedGallaries);
    const filteredSelectedItems = paginatedGallaries.filter(
      (gallary) => gallary.quantity > 0
    );
    setSelectedItems(filteredSelectedItems);
  };

  const handleDeletionItem = (selectedItem) => {
    setIsItemModified(true);
    const index = gallaries.indexOf(selectedItem);

    if (gallaries[index].quantity <= 0) {
      alert("Cannot decrement the item behind 0");
    } else {
      setGallaries(gallaries);
      gallaries[index].quantity = gallaries[index].quantity - 1;
      let filtered = [...gallaries];
      if (searchQuery) {
        filtered = gallaries.filter((m) =>
          m.brand.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      } else {
        filtered =
          selectedCatagory && selectedCatagory.slno
            ? gallaries.filter(
                (gallary) => gallary.name === selectedCatagory.name
              )
            : gallaries;
      }
      setFilteredGallaries(filtered);

      const paginatedGallaries = paginate(filtered, currentPage, pageSize);
      setPaginatedGallaries(paginatedGallaries);
      const filteredSelectedItems = paginatedGallaries.filter(
        (gallary) => gallary.quantity > 0
      );
      setSelectedItems(filteredSelectedItems);
    }
  };

  const navigateToBillingComponent = () => {
    //window.location = "/billing";

    history.push("/preview");
    onSelectItems(isItemModified ? selectedItems : billingItemsContext);
  };

  useEffect(() => {
    if (excelData) {
      const excelDataClone = excelData;
      const gallaries = excelDataClone;
      editBillingItems.forEach((editItem) => {
        gallaries.find(
          (gallary) => gallary.slno === editItem.slno
        ).isChecked = true;
      });
      setGallaries(gallaries);
    }
  }, [editBillingItems]);

  useEffect(() => {
    let filtered = [...gallaries];
    if (searchQuery) {
      filtered = gallaries.filter((m) =>
        m.brand.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else {
      filtered =
        selectedCatagory && selectedCatagory.slno
          ? gallaries.filter(
              (gallary) => gallary.name === selectedCatagory.name
            )
          : gallaries;
    }
    setFilteredGallaries(filtered);
    const paginatedGallaries = paginate(filtered, currentPage, pageSize);
    setPaginatedGallaries(paginatedGallaries);
  }, [gallaries, selectedCatagory, currentPage]);

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
          onCatagoryChange={handleCatagoryChange}
        />
      </div>
      <div className="col-9 background-image">
        <SearchBox value={searchQuery} onChange={handleSearch} />

        {paginatedGallaries.map((item) => (
          <div className="card card-style" key={item.slno}>
            <div className="card-body">
              <h5 className="card-title">{item.brand}</h5>

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
                  handleAdditionItem(item);
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
                  handleDeletionItem(item);
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
          items={filteredGallaries}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <button
          className="btn btn-success continue-billing-page-btn"
          onClick={navigateToBillingComponent}
        >
          Continue to Billing Page
        </button>
      </div>
    </div>
  );
};

export default GallarySection;
