import React, { useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import "../styles/subscription.css"; // Assuming you will style this page

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const subscriptionPlans = [
    { id: 1, name: "Basic Plan", price: 500, duration: "1 Month" },
    { id: 2, name: "Standard Plan", price: 1000, duration: "3 Months" },
    { id: 3, name: "Premium Plan", price: 1800, duration: "6 Months" },
  ];

  const khaltiConfig = {
    "publicKey": "your_khalti_public_key_here",  // Replace with your Khalti public key
    "productIdentity": "1234567890", // Unique identifier for the product (e.g., the subscription plan)
    "productName": selectedPlan ? selectedPlan.name : "Subscription Plan", // Name of the product
    "productUrl": window.location.href,  // URL of the product page
    "transactionAmount": selectedPlan ? selectedPlan.price * 100 : 0, // Price in paisa (100 paisa = 1 NPR)
    "callbackUrl": "http://your_callback_url_here", // URL where Khalti will send the payment status
  };

  const handlePayment = () => {
    if (!selectedPlan) {
      alert("Please select a subscription plan.");
      return;
    }

    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: selectedPlan.price * 100 }); // Amount in paisa
  };

  return (
    <div className="subscription">
      <h1>Choose Your Subscription Plan</h1>
      <div className="plans">
        {subscriptionPlans.map((plan) => (
          <div
            key={plan.id}
            className={`plan-card ${selectedPlan && selectedPlan.id === plan.id ? "selected" : ""}`}
            onClick={() => setSelectedPlan(plan)}
          >
            <h2>{plan.name}</h2>
            <p>{plan.duration}</p>
            <p>Price: NPR {plan.price}</p>
          </div>
        ))}
      </div>
      <button onClick={handlePayment} className="btn-pay">
        Pay Now
      </button>
    </div>
  );
};

export default Subscription;
