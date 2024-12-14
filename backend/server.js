require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const likeRoutes = require('./routes/likeRoutes');
const audioRoutes = require('./routes/audioRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');
const logger = require('./utils/logger');
const dashboardRoutes = require('./routes/dashboardRoutes');
const badgeRoutes = require('./routes/badgeRoutes');
const challengeRoutes = require('./routes/challengeRoutes');
const budgetBuddyRoutes = require('./routes/budgetBuddyRoutes');
const planADayRoutes = require('./routes/planADayRoutes');
const feelingsFriendRoutes = require('./routes/feelingsFriendRoutes');
const ecoExplorerRoutes = require('./routes/ecoExplorerRoutes');
const emergencyRoutes = require('./routes/emergencyRoutes');
const doodleJournalRoutes = require('./routes/doodleJournalRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const outfitRoutes = require('./routes/outfitRoutes');
const choreRoutes = require('./routes/choreRoutes');
const languageRoutes = require('./routes/languageRoutes');
const letterRoutes = require('./routes/letterRoutes');
const { getUserProgress, getLocations, completeActivity, getActivitiesByLocation } = require('./controllers/magicalMapController');const path = require('path');
const aiRoutes = require('./routes/aiRoutes');
const numberRoutes = require('./routes/numberRoutes');
const alphabetRoutes = require('./routes/alphabetRoutes');
const cookingRoutes = require('./routes/cookingRoutes');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sudoku = require('sudoku');
const User = require('./models/User'); // Adjust path as needed
const Stripe = require('stripe');

const app = express();
app.use(cors());
app.use(express.json());

const stripe = new Stripe('sk_test_CxtGqP2OIl6Vjdf2V6KN7BTx00gQwIcqre'); // Replace with your Stripe Secret Key


// Set CORS headers for all requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Routes
app.use('/api/auth', authRoutes);

//make sure that authentication is added in future
// app.use('/api/topics', authenticateToken, topicRoutes); // Topics routes (authenticated)

app.use('/api', topicRoutes); // Topics routes (authenticated)


app.use('/topics/:topicId/subtopics', authenticateToken, topicRoutes);

// Route to like a subtopic
app.use('/api', likeRoutes);

// Route to get liked topics by user
// app.use('/api/user/:userId/liked1', likeRoutes);

   app.use('/user/:userId/topics/:topicId/liked', likeRoutes);

   app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

   app.use('/api/audio', audioRoutes);

// Example of a protected route
// app.use('/api/protected', authenticateToken, (req, res) => {
//     res.json({ message: 'This is a protected route', user: req.user });
// });

app.use('/api/badges', badgeRoutes);

app.use('/api/challenges', challengeRoutes);
//app.use('/api/tasks', taskRoutes);
// app.use('/dashboard', dashboardRoutes);

app.use('/api/budgetBuddy', budgetBuddyRoutes);

app.use('/api/planADay', planADayRoutes);

app.use('/api/feelingsFriend', feelingsFriendRoutes);

app.use('/api/ecoExplorer', ecoExplorerRoutes);

app.use('/api/emergency101', emergencyRoutes);

app.use('/api/doodleJournal', doodleJournalRoutes);

app.use('/api/weather', weatherRoutes);
app.use('/api/outfits', outfitRoutes);

app.use('/api/chores', choreRoutes);

app.use('/api/languages', languageRoutes);
app.use('/api/letters', letterRoutes);

app.get('/api/locations', getLocations); // Get all map locations
app.get('/api/user-progress/:userId', getUserProgress); // Get user progress by userId
app.post('/api/complete-activity', completeActivity); // Complete an activity and unlock next location
app.get('/api/activities/:locationId', getActivitiesByLocation); // Fetch activities by location ID

app.use('/api/chat', aiRoutes);

app.use('/api/alphabets', alphabetRoutes);
app.use('/api/numbers', numberRoutes);

app.use('/api/cooking', cookingRoutes);

app.get('/api/sudoku', (req, res) => {
  console.log('here');
  const puzzle = sudoku.makepuzzle();
  const solution = sudoku.solvepuzzle(puzzle);

  const formattedPuzzle = puzzle.map((cell) => (cell === null ? null : cell + 1));
  const formattedSolution = solution.map((cell) => (cell === null ? null : cell + 1));

  res.json({
    puzzle: formattedPuzzle,
    solution: formattedSolution,
  });
});

// Route to handle contact form submissions
app.post('/api/contact', async (req, res) => {
  const { email, phone, description } = req.body;

  try {
    const query = 'INSERT INTO contacts (email, phone, description) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [email, phone, description]);
    console.log('Contact saved successfully:', result);
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (err) {
    console.error('Error inserting contact:', err);
    res.status(500).json({ message: 'Database error' });
  }
});



// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',  // e.g., use 'gmail' for Gmail
  auth: {
    user: 'manzaad@gmail.com',      // Replace with your email
    pass: 'cuzm uivu rskk bjoe'        // Replace with your email password or app password
  }
});

// Signup route with async/await
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email is already registered
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password and generate a verification token
    //const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Insert the new user into the database
    const insertQuery = 'INSERT INTO users (username, email, password, verification_token) VALUES (?, ?, ?, ?)';
    await db.query(insertQuery, [username, email, password, verificationToken]);

    // Send verification email
    const verificationUrl = `http://livewellwellbeing.com:5000/api/verify-email?token=${verificationToken}`;
    const mailOptions = {
      from: 'manzaad@gmail.com',
      to: email,
      subject: 'Verify Your Email',
      html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email and complete your registration.</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json({ message: 'User registered. Please check your email for verification.' });

  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
});

// Email verification route
app.get('/api/verify-email', (req, res) => {
  const { token } = req.query;

  const query = 'UPDATE users SET is_verified = TRUE, verification_token = NULL WHERE verification_token = ?';
  db.query(query, [token], (err, result) => {
    if (err) {
      console.error('Error verifying email:', err);
      return res.status(500).send('Email verification failed');
    }

    if (result.affectedRows === 0) {
      return res.status(400).send('Invalid or expired token');
    }

    res.send('Email verified successfully. You can now <a href="/login">log in</a>.');
  });
});


app.post('/api/auth/forgot-password', async (req, res) => {
  console.log("here");
  const { email } = req.body;

  // Simulate checking the database
  //const user = await User.findByUsername({ email });
  try {
   const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

  console.log("user", user[0].email, email);

  if (!user) {
      return res.status(404).json({ message: 'Email not registered.' });
  }

  // Simulate sending a reset password email
  // Here, you would generate a token and send an email to the user
  const resetToken = bcrypt.randomBytes(32).toString('hex');
  const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

  // Save the reset token to the database (hashed)
  const hashedToken = bcrypt.createHash('sha256').update(resetToken).digest('hex');
  const expiration = Date.now() + 3600000; // 1 hour ---> add this logic later to deactivate link or token
  // await user.save();


  const query = 'UPDATE users SET verification_token = ? WHERE email = ?';
  db.query(query, [hashedToken, user[0].email], (err, result) => {
    if (err) {
      console.error('Error Updating tokens:', err);
      return res.status(500).send('Email verification failed');
    }
console.log("result", result);
  // Send email (pseudo-code)
  if (result.affectedRows === 0) {
    return res.status(400).send('Update Failed');
  }

});

const mailOptions = {
  from: 'manzaad@gmail.com',
  to: user[0].email,
  subject: 'Reset Password',
  html: `Click this link to reset your password: ${resetLink}`
};
  
await transporter.sendMail(mailOptions);

res.json({ message: 'Password reset link sent to your email.' });
  } catch(err) {
    console.log("error", err);
    return res.status(400).send('Update Failed');
  }
});




// Reset Password Route
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
      // Hash the provided token to match the one stored in the database
      const hashedToken = bcrypt.createHash('sha256').update(token).digest('hex');

      // Establish a database connection
      // const connection =  mysql.createConnection(db);

      // Find user by the reset token and check expiration
      const [rows] =  await db.query(
          `SELECT * FROM users WHERE verification_token = ?`,
          [hashedToken]
      );

      const user = rows[0];

      if (!user) {
           await db.end();
          return res.status(400).json({ message: 'Invalid or expired token.' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Update user's password and clear the reset token
      await db.query(
          `UPDATE users SET password = ?, verification_token = NULL WHERE id = ?`,
          [hashedPassword, user.id]
      );

       await db.end();

      res.json({ message: 'Password reset successful. You can now log in.' });
  } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Server error.' });
  }
});


// Create Payment Intent Endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to smallest currency unit (e.g., paise)
      currency: 'inr',
      payment_method_types: ['card'],
      description: 'Subscription for wellness program', // Add a meaningful description
      shipping: {
        name: 'customerName',
        address: {
          line1: 'customerAddress.line1',
          line2: 'customerAddress.line2' || '',
          city: 'customerAddress.city',
          state: 'customerAddress.state',
          postal_code: 'customerAddress.postal_code',
          country: 'IN', // Country code for India
        },
      },
      receipt_email: 'manzaad@gmail.com', // Optional: Send payment receipt to the customer
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Payment Success Handling and Database Update
app.post('/api/verify-payment', async (req, res) => {
  const { paymentIntentId, userId, packageName } = req.body;
  try {
    // Retrieve the PaymentIntent details
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      // Update the user's subscription details in the database
      const subscriptionQuery = `
        UPDATE users 
        SET is_subscribed = 1, 
            subscription_package = ?, 
            subscription_start_date = NOW(), 
            subscription_end_date = DATE_ADD(NOW(), INTERVAL ? MONTH)
        WHERE id = ?
      `;
      console.log(userId, subscriptionQuery);

      let subscriptionMonths = 0;
      if (packageName === '3 Months') subscriptionMonths = 3;
      else if (packageName === '6 Months') subscriptionMonths = 6;
      else if (packageName === '12 Months') subscriptionMonths = 12;

      await db.execute(subscriptionQuery, [packageName, subscriptionMonths, userId]);

      res.json({ success: true, message: 'Subscription updated successfully!' });
    } else {
      res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
