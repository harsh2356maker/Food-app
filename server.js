const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('DB Error:', err));
app.use('/orders', require('./routes/orders'));
app.use('/admin', require('./routes/admin'));
app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));