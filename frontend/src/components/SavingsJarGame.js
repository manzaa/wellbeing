import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, List, ListItem, Button } from '@mui/material';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SavingsJarGame = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [milestone, setMilestone] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // Toggle for transaction history
  const { transcript, resetTranscript } = useSpeechRecognition();
  const userId = sessionStorage.getItem('userId');
  // Define storage keys with userId
  const transactionsKey = `transactions_${userId}`;
  const balanceKey = `balance_${userId}`;

  useEffect(() => {
    // Load balance and transactions from localStorage on component mount
    const savedTransactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];
    const savedBalance = parseInt(localStorage.getItem(balanceKey), 10) || 0;

    setTransactions(savedTransactions);
    setBalance(savedBalance);
  }, [transactionsKey, balanceKey]);

  useEffect(() => {
    // Save transactions and balance to localStorage whenever they change
    localStorage.setItem(transactionsKey, JSON.stringify(transactions));
    localStorage.setItem(balanceKey, balance.toString());
  }, [transactions, balance, transactionsKey, balanceKey]);

  useEffect(() => {
    // Process the command whenever the transcript changes
    if (transcript) {
      setProcessing(true);
      handleVoiceCommand(transcript);
    }
  }, [transcript]);

  const handleTransaction = (amount, type, message) => {
    // Update balance based on the transaction type
    const newBalance = type === "save" ? balance + amount : balance - amount;
    setBalance(newBalance);
    checkMilestone(newBalance);

    // Add transaction with amount, type, and message
    setTransactions([...transactions, { amount, type, id: Date.now(), message }]);
    setProcessing(false); // Stop processing
  };

  const checkMilestone = (currentBalance) => {
    // Check for dynamic milestones at every 100 rupees increment
    if (currentBalance > 0 && currentBalance % 100 === 0) {
      setMilestone(currentBalance);
      setTimeout(() => setMilestone(null), 3000); // Clear milestone after 3 seconds
    }
  };

  const handleVoiceCommand = (text) => {
    const words = text.toLowerCase().split(" ");
    const amount = parseInt(words.find(word => !isNaN(word)));
    const type = words.includes("got") || words.includes("save") ? "save" : 
                 words.includes("spent") || words.includes("spend") ? "spend" : null;

    if (amount && type) {
      handleTransaction(amount, type, text); // Pass the full text as message
      resetTranscript();
    } else {
      setProcessing(false); // Stop processing if command is invalid
    }
  };

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <Typography>Browser does not support speech recognition.</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>Savings Jar Game</Typography>
      
      {/* Voice Input Controls */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button variant="contained" color="primary" onClick={SpeechRecognition.startListening}>
          Start Talking
        </Button>
        <Typography variant="caption" display="block" style={{ marginTop: '10px' }}>
          {processing ? "Processing..." : `You said: ${transcript}`}
        </Typography>
      </div>
      
      {/* Display Balance and Recent Transactions */}
      <Paper style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Current Balance: ₹{balance}</Typography>
        <Typography variant="subtitle1" style={{ marginTop: '10px' }}>Recent Transactions:</Typography>
        <List>
          {transactions.slice(-5).map((transaction) => (
            <ListItem key={transaction.id}>
              {transaction.type === "save" ? "+" : "-"}₹{transaction.amount} - "{transaction.message}"
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Button to Toggle Full Transaction History */}
      <Button variant="contained" color="secondary" onClick={() => setShowHistory(!showHistory)} style={{ marginBottom: '20px' }}>
        {showHistory ? "Hide" : "Show"} Full Transaction History
      </Button>

      {/* Full Transaction History */}
      {showHistory && (
        <Paper style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h6">Full Transaction History</Typography>
          <List>
            {transactions.map((transaction) => (
              <ListItem key={transaction.id}>
                {transaction.type === "save" ? "+" : "-"}₹{transaction.amount} - "{transaction.message}"
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      
      {/* Milestone Celebration */}
      {milestone && (
        <div style={{ textAlign: 'center', marginTop: '20px', color: 'green' }}>
          <Typography variant="h5" style={{ animation: 'pop 0.5s ease' }}>
            🎉 Congratulations! You reached ₹{milestone}! 🎉
          </Typography>
          <style>
            {`
              @keyframes pop {
                0% { transform: scale(0.8); }
                100% { transform: scale(1.2); }
              }
            `}
          </style>
        </div>
      )}
    </Container>
  );
};

export default SavingsJarGame;
