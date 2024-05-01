const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const weatherApi = require('./routes/weatherapi')
const PORT = 3001;

const app = express ();
dotenv.config({path:'./config/config.env'});

app.use(cors())
app.use(express.json());
app.use('/api',weatherApi);

app.listen(PORT, () => {
    console.log("Proxy server Listening on PORT:", PORT);
  });