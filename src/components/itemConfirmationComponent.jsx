import React, { useContext, useEffect, useState } from "react";
import BillingItemsContext from "../context/BillingItemsContext";
import * as userService from "../services/registrationService";

const ItemConfirmationSectionComponent = () => {
  const DISCOUNT_PERCENTAGE = 15;
  const billingItemsContext = useContext(BillingItemsContext);
  const [agentList, setAgentList] = useState([]);
  const [isAgentRegistered, setIsAgentRegistered] = useState(false);
  const [registeredAgent, setRegisteredAgent] = useState({});
  const [userAgentInfo, setUserAgentInfo] = useState();
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
    //setUserAgentInfo(input);
  };

  const handleAgentCheck = (event) => {
    // setValues((values) => ({
    //   ...values,
    //   [userAgentInfo.name]: userAgentInfo.value,
    // }));
    setUserAgentInfo(values);
    event.preventDefault();
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
      (agent) => agent.agentId === userAgentInfo?.agentId
    );
    setIsAgentRegistered(registeredAgent);
    setRegisteredAgent(registeredAgent);
  }, [agentList, userAgentInfo]);

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
            <button
              className="btn btn-small btn-success check-for-agent"
              onClick={(e) => {
                handleAgentCheck(e);
              }}
              disabled={!billingItemsContext}
            >
              Check For Agent
            </button>
          </div>
        </div>
        {!userAgentInfo?.agentId && <div className="col-md-6"></div>}
        {userAgentInfo?.agentId && (
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

      {values.customerName && values.customerPhoneNumber && (
        <div className="row">
          <div className="col-6">
            <table>
              <tr>
                <th> &nbsp;Customer Name:</th>
                <td>{values.customerName}</td>
              </tr>
              <tr>
                <th>Phone Number:</th>
                <td>{values.customerPhoneNumber}</td>
              </tr>
            </table>
          </div>
        </div>
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

export default ItemConfirmationSectionComponent;
