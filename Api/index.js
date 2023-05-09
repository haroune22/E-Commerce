const express = require('express');
const app = express();
require('dotenv').config()
require ("./Config/db").connect();
const apiRoutes = require('./Routes/index')
const cors = require("cors")

app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] 
}));

app.use("/api",apiRoutes());

app.listen(process.env.PORT || 7100,()=>{
    console.log('listening on port 7100');
});
