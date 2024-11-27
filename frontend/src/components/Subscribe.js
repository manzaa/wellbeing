import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tooltip,
} from '@mui/material';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_bXIzGfpNqmedBCUtvEtgDzFC00tTAecWtq'); // Replace with your Stripe publishable key

const Subscribe = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method
  const [loading, setLoading] = useState(false);
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);

  const packages = [
    { id: 1, name: '3 Months', amount: 399, description: 'Perfect for a short-term experience.' },
    { id: 2, name: '6 Months', amount: 699, description: 'Great for continued learning and growth.' },
    { id: 3, name: '12 Months', amount: 999, description: 'Best value for long-term benefits.' },
  ];

  const handleSubscribe = (pkg) => {
    setSelectedPackage(pkg);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Choose Your Subscription Plan
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Unlock exclusive features and activities designed for your well-being journey.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {packages.map((pkg) => (
          <Grid item xs={12} sm={6} md={4} key={pkg.id}>
            <Card
              sx={{
                boxShadow: '0px 10px 20px rgba(0,0,0,0.1)',
                borderRadius: 4,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0px 15px 30px rgba(0,0,0,0.2)',
                },
                background:
                  selectedPackage?.id === pkg.id ? 'linear-gradient(135deg, #6C63FF, #957DFF)' : 'white',
                color: selectedPackage?.id === pkg.id ? 'white' : 'black',
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Typography variant="h6" fontWeight="bold">
                  {pkg.name}
                </Typography>
                <Typography variant="h4" fontWeight="bold" sx={{ my: 2 }}>
                  ₹{pkg.amount}
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  {pkg.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubscribe(pkg)}
                  sx={{
                    bgcolor: selectedPackage?.id === pkg.id ? 'white' : 'primary.main',
                    color: selectedPackage?.id === pkg.id ? 'primary.main' : 'white',
                    fontWeight: 'bold',
                    '&:hover': {
                      bgcolor: selectedPackage?.id === pkg.id ? '#f0f0f0' : 'primary.dark',
                    },
                  }}
                >
                  Select Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedPackage && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h5" fontWeight="bold">
            You selected: {selectedPackage.name} for ₹{selectedPackage.amount}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Choose your preferred payment method and proceed to payment.
          </Typography>

          <RadioGroup
            row
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ justifyContent: 'center', mb: 4 }}
          >
            <Tooltip title="Pay using a credit or debit card" arrow>
              <FormControlLabel value="card" control={<Radio />} label="Card" />
            </Tooltip>
            {/* <Tooltip title="Pay using UPI" arrow>
              <FormControlLabel value="upi" control={<Radio />} label="UPI" />
            </Tooltip>
            <Tooltip title="Pay using Net Banking" arrow>
              <FormControlLabel value="netbanking" control={<Radio />} label="Net Banking" />
            </Tooltip> */}
          </RadioGroup>

          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={selectedPackage.amount}
              packageName={selectedPackage.name}
              paymentMethod={paymentMethod}
              setLoading={setLoading}
              setPaymentSucceeded={setPaymentSucceeded}
            />
          </Elements>
        </Box>
      )}

      {loading && (
        <Box textAlign="center" sx={{ mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

const CheckoutForm = ({ amount, packageName, setLoading, setPaymentSucceeded }) => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
  
      try {
        const { data: clientSecret } = await axios.post(process.env.REACT_APP_API_URL + '/api/create-payment-intent', { amount });
    console.log("data", clientSecret.clientSecret);
        if (!stripe || !elements) {
          alert('Stripe has not loaded properly.');
          return;
        }
  
        const cardElement = elements.getElement(CardElement);
        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret.clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });
  
        if (error) {
          console.error('Payment failed:', error);
          alert('Payment failed. Please try again.');
        } else if (paymentIntent.status === 'succeeded') {
          // Call the backend to verify the payment and update the database
          const verifyPayload = {
            paymentIntentId: paymentIntent.id,
            userId: sessionStorage.getItem('userId'), // Replace with the actual user ID from your context or state
            packageName: packageName,
          };
  
          try {
            const { data } = await axios.post(process.env.REACT_APP_API_URL + '/api/verify-payment', verifyPayload);
            if (data.success) {
              setPaymentSucceeded(true);
              alert(`Payment successful! Your ${packageName} subscription is now active.`);
            } else {
              alert('Payment verification failed. Please contact support.');
            }
          } catch (verifyError) {
            console.error('Error verifying payment:', verifyError);
            alert('Error verifying payment. Please try again later.');
          }
        }
      } catch (error) {
        console.error('Error processing payment:', error);
        alert('Error processing payment. Please try again.');
      }
  
      setLoading(false);
    };
  
    return (
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#424770' } } }} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!stripe}
          sx={{ mt: 2, fontWeight: 'bold' }}
        >
          Pay ₹{amount}
        </Button>
      </form>
    );
  };

export default Subscribe;
