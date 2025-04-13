const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// API route to send text to Python model service
app.post("/api/fake-news", async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios.post("http://localhost:5000/predict", { text });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction service failed" });
  }
});

app.listen(3001, () => {
  console.log("Node backend running on http://localhost:3001");
});
