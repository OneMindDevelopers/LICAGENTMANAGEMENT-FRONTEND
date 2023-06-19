import React, { Component, useContext, useEffect, useState } from "react";
import BillingItemsContext from "../context/BillingItemsContext";
import * as userService from "../services/registrationService";

const ConfirmationSectionComponent = () => {
  const DISCOUNT_PERCENTAGE = 15;
  const billingItemsContext = useContext(BillingItemsContext);
  const [agentList, setAgentList] = useState([]);
  const [isAgentRegistered, setIsAgentRegistered] = useState(false);
  const [registeredAgent, setRegisteredAgent] = useState({});
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
    if (!isAgentRegistered) {
      setTotalPrice(totalPrice);
    } else {
      let discountAmount = DISCOUNT_PERCENTAGE / 100;
      const totalAmountAfterDiscount = totalPrice - totalPrice * discountAmount;
      setTotalPrice(totalAmountAfterDiscount);
    }

    console.log("billingItemsContext", billingItemsContext);
  }, [billingItemsContext, totalPrice, isAgentRegistered]);

  useEffect(() => {
    userService
      .getAgentRegistration()
      .then((res) => {
        setAgentList(res.data);
      })
      .catch((error) => {
        console.info("Something went wrong", error);
      });
  }, []);

  useEffect(() => {
    const registeredAgent = agentList.find(
      (agent) => agent.agentId === values.agentId
    );
    setIsAgentRegistered(registeredAgent);
    setRegisteredAgent(registeredAgent);
  }, [agentList, values.agentId]);

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
        {!values.agentId && <div className="col-md-6"></div>}
        {values.agentId && (
          <div className="col-md-6">
            {isAgentRegistered && (
              <div className="alert alert-primary m-2" role="alert">
                The Customer is registered with the Agent{" "}
                <span style={{ fontWeight: "bold" }}>
                  {registeredAgent?.agentName}
                </span>
              </div>
            )}
            {!isAgentRegistered && (
              <div className="alert alert-primary m-2" role="alert">
                The Customer is not registered with any agent
                {registeredAgent?.agentName}
              </div>
            )}
          </div>
        )}
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
      {billingItemsContext && (
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Sl No</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Size</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {billingItemsContext.map((item) => (
              <tr key={item.slno}>
                <td>{item.slno}</td>
                <td>{item.brand}</td>
                <td>{item.category}</td>
                <td>{item.size}</td>
                <td>{item.quantity}</td>
                <td>{item.size * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isAgentRegistered && (
        <div className="text-right">{`Discount Appiled: 15 %`}</div>
      )}
      <div className="text-right">{`Total Price: ${totalPrice}`}</div>
    </>
  );
};

export default ConfirmationSectionComponent;
