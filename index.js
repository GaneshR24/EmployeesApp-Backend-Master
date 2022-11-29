require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Importing DB connection
const db = require("./db/connect");

// Importing Routes
const authRoutes = require("./routes/auth.routes");
const employeesRoutes = require("./routes/employees.routes");

const app = express();
db(); //Establishing DB connection

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to our Employees App!')
});

// Adding Custom Middleware
app.use("/api", authRoutes);
app.use("/api", employeesRoutes);

const PORT = process.env.PORT || 9001;

app.listen(PORT, () => {
    console.log(`Application is running on port ${PORT}`);
});