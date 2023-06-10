import React, { Component } from "react";
import item1 from "../images/item01.jpg";
import item2 from "../images/item02.jpg";
import plusicon from "../images/plusicon.png";
import minusicon from "../images/minusicon.png";

class BillingPage extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <h1>Order Summary</h1>
        <div className="row  ">
          <div className="jumbotron  mt-5 col-6  ">
            <div className="card billing-card-width float-left m-2">
              <img src={item1} className="card-img-top" alt="image01" />
              <div className="card-body">
                <h5 className="card-title">Nike Shoe</h5>
                <p className="card-text">
                  <img
                    src={plusicon}
                    className="card-img-top width-40 float-left plus-icon"
                    alt="plusicon"
                  />
                  <input
                    type="number"
                    class="form-control billing-qty-box"
                    id="billingqty"
                    value={"1"}
                  />
                  <img
                    src={minusicon}
                    className="card-img-top width-40"
                    alt="minusicon"
                  />
                </p>
                <p>Size: 10</p>
                <p>Price: 100</p>
              </div>
            </div>

            <div className="card billing-card-width m-2 ">
              <img src={item2} className="card-img-top" alt="image02" />
              <div className="card-body">
                <h5 className="card-title">Puma Shoe</h5>
                <p className="card-text">
                  <img
                    src={plusicon}
                    className="card-img-top width-40 float-left plus-icon"
                    alt="plusicon"
                  />
                  <input
                    type="number"
                    class="form-control billing-qty-box"
                    id="billingqty"
                    value={"2"}
                  />
                  <img
                    src={minusicon}
                    className="card-img-top width-40"
                    alt="minusicon"
                  />
                </p>
                <p>Size: 8</p>
                <p>Price: 200</p>
              </div>
            </div>
          </div>
          <div className="col-6 background-white">
            <h1> Pricing Details:</h1>
            <hr/>
            <p>Items: 2</p>
            <p> Qty: 3</p>
            <p> Total Price: 300</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BillingPage;
