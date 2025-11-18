const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// --- MongoDB Connection ---
// To connect to your database, uncomment the following lines
// and replace the placeholder URI with your actual connection string.
const uri = "YOUR_MONGODB_CONNECTION_STRING";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});


const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

app.use('/users', usersRouter);
app.use('/todos', todosRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
