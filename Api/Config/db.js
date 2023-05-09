const mongoose = require("mongoose");
const  URI  = process.env.URI;


exports.connect = () => {
mongoose.set('strictQuery', false);    
mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((x) => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`
      );
    })
    .catch((err) => {
      console.error("Error connecting to mongo", err.reason);
    });
};

