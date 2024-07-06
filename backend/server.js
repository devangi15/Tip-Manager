const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const tipRoutes = require('./routes/tipRoutes');
const cors = require('cors');  

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/user', userRoutes);
app.use('/tip', tipRoutes);

mongoose.connect("mongodb+srv://naliyadharadevangi15:Devangi%40123@cluster0.gcvtj0u.mongodb.net/tip-manager", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
