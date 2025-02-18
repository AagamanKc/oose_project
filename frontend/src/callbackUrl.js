app.post('/khalti/payment/callback', (req, res) => {
    const { token, amount } = req.body;
    const paymentVerificationData = {
      token: token,
      amount: amount,
    };
  
    // Make an API call to Khalti to verify the payment
    axios.post('https://khalti.com/api/v2/payment/verify/', paymentVerificationData)
      .then((response) => {
        // Handle success: Mark the subscription as paid in your database
        res.status(200).send("Payment verified successfully");
      })
      .catch((error) => {
        // Handle failure: Payment verification failed
        res.status(500).send("Payment verification failed");
      });
  });
  