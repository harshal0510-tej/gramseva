const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let complaints = [];

// Generate Complaint ID
function generateID() {
  return "GC-" + Math.floor(100000 + Math.random() * 900000);
}

// Submit Complaint
app.post("/complaint", (req, res) => {
  const { village, type, description } = req.body;

  const newComplaint = {
    id: generateID(),
    village,
    type,
    description,
    status: "Pending"
  };

  complaints.push(newComplaint);

  res.json({
    message: "Complaint Registered",
    complaintId: newComplaint.id
  });
});

// Track Complaint
app.get("/track/:id", (req, res) => {
  const id = req.params.id;

  const complaint = complaints.find(c => c.id === id);

  if (complaint) {
    res.json(complaint);
  } else {
    res.json({ message: "Not Found" });
  }
});

// Start Server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});