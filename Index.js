const express = require('express');
const cors = require('cors');
const app = express();

let predictedNumber = null;
let winningNumber = null;

app.use(cors());
app.use(express.json());

app.get('/prediction', (req, res) => {
  predictedNumber = Math.floor(Math.random() * 100);
  res.json({ predictedNumber });
});

app.post('/set-winning', (req, res) => {
  winningNumber = req.body.winningNumber;
  res.json({ message: 'Winning number set successfully', winningNumber });
});

app.get('/result', (req, res) => {
  if (predictedNumber === null || winningNumber === null) {
    return res.status(400).json({ message: 'Prediction or winning number not set' });
  }
  const result = predictedNumber == winningNumber ? 'Win' : 'Lose';
  res.json({ predictedNumber, winningNumber, result });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
