const express = require("express");
const path = require("path");
const {
  initDB,
  getStats,
  getRecentContacts,
  addContactMessage,
  addVolunteerSignup,
  addDonation,
} = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Black Organization API is running." });
});

app.get("/api/stats", async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: "Unable to load stats." });
  }
});

app.get("/api/contact-messages", async (req, res) => {
  try {
    const messages = await getRecentContacts();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Unable to retrieve contact messages." });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const stats = await getStats();
    const messages = await getRecentContacts();
    res.json({ stats, messages });
  } catch (error) {
    res.status(500).json({ error: "Unable to load dashboard data." });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required.",
    });
  }

  try {
    await addContactMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : "",
      message: message.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Thank you. Your message has been received and our team will follow up soon.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "There was a problem saving your message.",
    });
  }
});

app.post("/api/volunteer", async (req, res) => {
  const { name, email, focus, interest } = req.body || {};

  if (!name || !email || !focus || !interest) {
    return res.status(400).json({
      success: false,
      message: "Please complete all volunteer form fields.",
    });
  }

  try {
    await addVolunteerSignup({
      name: name.trim(),
      email: email.trim(),
      focus: focus.trim(),
      interest: interest.trim(),
    });

    res.status(201).json({
      success: true,
      message: "You’re on the list. We’ll contact you with the next steps.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to save your volunteer interest right now.",
    });
  }
});

app.post("/api/donate", async (req, res) => {
  const { name, email, amount, purpose } = req.body || {};

  if (!name || !email || !amount || !purpose) {
    return res.status(400).json({
      success: false,
      message: "Name, email, amount, and purpose are required.",
    });
  }

  try {
    await addDonation({
      name: name.trim(),
      email: email.trim(),
      amount: Number(amount),
      purpose: purpose.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Thank you for supporting the mission. Your contribution is making an impact.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to record your support right now.",
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/programs", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "programs.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

async function startServer() {
  await initDB();
  app.listen(PORT, () => {
    console.log(`Black Organization app running on http://localhost:${PORT}`);
  });
}

startServer();

module.exports = app;
