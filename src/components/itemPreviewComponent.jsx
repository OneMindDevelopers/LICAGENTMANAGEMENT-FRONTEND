import React, { useContext, useEffect, useState } from "react";
import BillingItemsContext from "../context/BillingItemsContext";

const ItemPreviewComponent = ({ OnEditOptionBillingPage, history }) => {
  const billingItemsContext = useContext(BillingItemsContext);
  const [billingItems, setBillingItems] = useState(billingItemsContext);
  const [totalQty, setTotalQty] = useState();
  const [totalItems, setTotalItems] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    let totalQty = 0;
    let totalItems = 0;
    let totalPrice = 0;
    const billingItemsClone = [...billingItemsContext];
    billingItemsClone.forEach((billingItem) => {
      totalQty = totalQty + billingItem.quantity;
      totalItems = totalItems + 1;
      totalPrice = totalPrice + billingItem.price * billingItem.quantity;
    });
    setBillingItems(billingItemsClone);
    setTotalItems(totalItems);
    setTotalQty(totalQty);
    setTotalPrice(totalPrice);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    let totalQty = 0;
    let totalItems = 0;
    let totalPrice = 0;
    billingItems.forEach((billingItem) => {
      totalQty = totalQty + billingItem.quantity;
      totalItems = totalItems + 1;
      totalPrice = totalPrice + billingItem.price * billingItem.quantity;
    });
    setBillingItems(billingItems);
    setTotalItems(totalItems);
    setTotalQty(totalQty);
    setTotalPrice(totalPrice);
  }, [billingItems]);

  const handlePlusIncrement = (selectedItem) => {
    const billingItems = [...billingItemsContext];
    const index = billingItems.indexOf(selectedItem);
    billingItems[index].quantity = billingItems[index].quantity + 1;
    setBillingItems(billingItems);
  };

  const handleMinusDecrement = (selectedItem) => {
    const billingItems = [...billingItemsContext];
    const index = billingItems.indexOf(selectedItem);

    billingItems[index].quantity = billingItems[index].quantity - 1;
    const filteredItems = billingItems.filter((item) => item.quantity > 0);
    setBillingItems(filteredItems);
  };

  const handleEditOptionBillingPage = () => {
    history.push("/gallary");
    OnEditOptionBillingPage(billingItems);
  };

  const navigateToconfirmComponent = () => {
    history.push("/confirm");
  };

  return (
    <React.Fragment>
      <div className="row background-image">
        <h1>Order Summary</h1>
        <div className="jumbotron  mt-5 col-6">
          <span className=" billing-edit-page">
            <button
              className="btn btn-success editbutton_billingpage"
              onClick={handleEditOptionBillingPage}
            >
              Edit the Selected Items
            </button>
          </span>

          <span className="billing-navigate-confirmation">
            <button
              className="btn btn-dark"
              onClick={navigateToconfirmComponent}
            >
              Continue to Confirmation Page
            </button>
          </span>

          {billingItems.length === 0 && (
            <h1>
              There are no items in the billing page, please select from gallary
              page
            </h1>
          )}

          {billingItems.length > 0 && (
            <ul className="list-group">
              {billingItems.map((billingItem) => (
                <li
                  key={billingItem.id}
                  className="list-group-item background-color preview-item"
                >
                  <span className="billing-item-name">
                    {billingItem.brand}
                  </span>
                  <span className="billing-qty-icons">
                    <p className="card-text">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="26"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-plus-fill"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          handlePlusIncrement(billingItem);
                        }}
                      >
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM8.5 6v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 1 0z" />
                      </svg>
                      <input
                        type="number"
                        className="width-40"
                        value={billingItem.quantity}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-file-minus-fill"
                        viewBox="0 0 16 16"
                        onClick={() => {
                          //this.handleDeletionItem(item);
                          handleMinusDecrement(billingItem);
                        }}
                      >
                        <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6 7.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1z" />
                      </svg>
                    </p>
                  </span>

                  <span className="billing-item-size">
                    SIZE:{billingItem.size}
                  </span>
                  <span className="billing-item-price">
                    PRICE:{billingItem.price}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-6 background-white background-image">
          <h1> Pricing Details:</h1>
          <hr />
          <p>Items: {totalItems}</p>
          <p> Qty: {totalQty}</p>
          <p> Total Price: {totalPrice}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ItemPreviewComponent;
