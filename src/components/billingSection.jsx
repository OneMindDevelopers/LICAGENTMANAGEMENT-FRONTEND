import React, { useContext, useEffect, useState } from "react";
import BillingItemsContext from "../context/BillingItemsContext";

const BillingSectionComponent = ({ OnEditOptionBillingPage, history }) => {
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

    if (billingItems[index].quantity <= 0) {
      alert("Cannot decrement the item behind 0");
      return;
    }

    billingItems[index].quantity = billingItems[index].quantity - 1;
    setBillingItems(billingItems);
  };

  const handleEditOptionBillingPage = () => {
    history.push("/gallary");
    OnEditOptionBillingPage(billingItems);
  };

  const navigateToconfirmComponent = () => {
    history.push("/confirm");
 
  }

  return (
    <React.Fragment>
      <h1>Order Summary</h1>
      <div className="row">
        <div className="jumbotron  mt-5 col-6 ">
          <button
            className="editbutton_billingpage"
            onClick={handleEditOptionBillingPage}
          >
            Edit the Selected Items
          </button>
          {billingItems.map((billingItem) => (
            <div
              className="card billing-card-width float-left m-5"
              key={billingItem._id}
            >
              <div className="card-body">
                <h5 className="card-title">{billingItem.name}</h5>
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
                <p>Size: {billingItem.size}</p>
                <p>Price: {billingItem.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-6 background-white">
          <h1> Pricing Details:</h1>
          <hr />
          <p>Items: {totalItems}</p>
          <p> Qty: {totalQty}</p>
          <p> Total Price: {totalPrice}</p>
        </div>
      </div>
      <button onClick={navigateToconfirmComponent}>
          Continue to Billing Page
        </button>
    </React.Fragment>
  );
};

export default BillingSectionComponent;
