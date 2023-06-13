import React, { Component } from "react";
import { getBillingItems } from "../services/fakeBillingItemsService";

class BillingPage extends Component {
  state = {
    billingItems: [],
    totalQty: 0,
    totalItems: 0,
    totalPrice: 0,
  };

  componentDidMount = () => {
    let totalQty = 0;
    let totalItems = 0;
    let totalPrice = 0;
    const billingItems = [...getBillingItems()];
    billingItems.forEach((billingItem) => {
      totalQty = totalQty + billingItem.qty;
      totalItems = totalItems + 1;
      totalPrice = totalPrice + billingItem.price * billingItem.qty;
    });

    this.setState({ billingItems, totalQty, totalItems, totalPrice });
  };

  handlePlusIncrement = (selectedItem) => {
    const billingItems = [...getBillingItems()];
    const index = billingItems.indexOf(selectedItem);
    billingItems[index].qty = billingItems[index].qty + 1;
    this.setState({ billingItems });
  };

  handleMinusDecrement = (selectedItem) => {
    const billingItems = [...getBillingItems()];
    const index = billingItems.indexOf(selectedItem);

    if (billingItems[index].qty <= 0) {
      alert("Cannot decrement the item behind 0");
      return;
    }

    billingItems[index].qty = billingItems[index].qty - 1;
    this.setState({ billingItems });
  };

  componentDidUpdate = (prevProps, currentProps) => {
    if (
      this.state.billingItems !== currentProps.billingItems &&
      currentProps.billingItems.length !== 0
    ) {
      let totalQty = 0;
      let totalItems = 0;
      let totalPrice = 0;
      const billingItems = [...currentProps.billingItems];
      billingItems.forEach((billingItem) => {
        totalQty = totalQty + billingItem.qty;
        totalItems = totalItems + 1;
        totalPrice = totalPrice + billingItem.price * billingItem.qty;
      });
      this.setState({ totalQty, totalItems, totalPrice });
    }
  };

  render() {
    console.log("billing Items abc", this.props.billingItems);
    const { billingItems } = this.state;
    return (
      <React.Fragment>
        <h1>Order Summary</h1>
        <div className="row">
          <div className="jumbotron  mt-5 col-6 ">
            {billingItems.map((billingItem) => (
              <div
                className="card billing-card-width float-left m-2"
                key={billingItem._id}
              >
                <img
                  src={billingItem.item_image}
                  className="card-img-top"
                  alt="image01"
                />
                <div className="card-body">
                  <h5 className="card-title">{billingItem.name}</h5>
                  <p className="card-text">
                    <img
                      src={billingItem.plus_icon}
                      className="card-img-top width-40 float-left plus-icon"
                      alt="plusicon"
                      onClick={() => {
                        this.handlePlusIncrement(billingItem);
                      }}
                    />
                    <input
                      type="number"
                      class="form-control billing-qty-box"
                      id="billingqty"
                      value={billingItem.qty}
                    />
                    <img
                      src={billingItem.minus_icon}
                      className="card-img-top width-40"
                      alt="minusicon"
                      onClick={() => {
                        this.handleMinusDecrement(billingItem);
                      }}
                    />
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
            <p>Items: {this.state.totalItems}</p>
            <p> Qty: {this.state.totalQty}</p>
            <p> Total Price: {this.state.totalPrice}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BillingPage;
