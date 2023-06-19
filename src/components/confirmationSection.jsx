import React, { Component, useContext, useEffect, useState } from "react";
import BillingItemsContext from "../context/BillingItemsContext";

const ConfirmationSectionComponent = () => {
  const billingItemsContext = useContext(BillingItemsContext);
  const [values, setValues] = useState({
    agentId: "",
    customerName: "",
    customerPhoneNumber: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const handleInputChange = ({ currentTarget: input }) => {
    setValues((values) => ({
      ...values,
      [input.name]: input.value,
    }));
  };

  useEffect(() => {
    let totalPrice = 0;
    billingItemsContext.forEach((item) => {
      totalPrice = totalPrice + item.price * item.quantity;
    });
    setTotalPrice(totalPrice);
  }, [billingItemsContext]);

  return (
    <>
      <form className="row g-3">
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label" name="agentId">
              Agent Id:
            </label>
            <input
              type="text"
              id="agentId"
              placeholder="Enter the Agent ID"
              name="agentId"
              value={values.agentId}
              className="form-control"
              onChange={handleInputChange}
              style={{ width: "300px", margin: "0 auto" }}
            />
          </div>
        </div>
        <div className="col-md-6"></div>
        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label" name="customerName">
              Customer Name
            </label>
            <input
              type="text"
              name="customerName"
              id="customerName"
              placeholder="Enter the Customer Name"
              className="form-control"
              value={values.customerName}
              onChange={handleInputChange}
              style={{ width: "300px", margin: "0 auto" }}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label className="form-label" name="customerPhone">
              Customer Phone Number
            </label>
            <input
              type="text"
              name="customerPhoneNumber"
              id="phoneNumber"
              placeholder="Enter the Phone Number"
              value={values.customerPhoneNumber}
              className="form-control"
              onChange={handleInputChange}
              style={{ width: "300px", margin: "0 auto" }}
            />
          </div>
        </div>
      </form>
      <hr />
      {values.customerName && (
        <div>Name of the customer is: {values.customerName}</div>
      )}
      <br />
      {values.customerPhoneNumber && (
        <div>Phone Number of the Customer is: {values.customerPhoneNumber}</div>
      )}
      <br />
      {billingItemsContext.map((item) => (
        <>
          <ul>
            <li>
              <span className="float-left">{`BRAND : ${item.brand} CATEGORY: ${item.category} SIZE: ${item.size}`}</span>{" "}
              <span className="text-center">{`PRICE: ${item.price} * ${item.quantity} = `}</span>{" "}
              <span className="float-right">{`${
                item.price * item.quantity
              }`}</span>
            </li>
          </ul>
        </>
      ))}
      <div>{`Total Price: ${totalPrice}`}</div>
    </>
  );
};

export default ConfirmationSectionComponent;
