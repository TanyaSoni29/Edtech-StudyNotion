const mongoose = require("mongoose");

require("dotenv").config();

exports.connectDb = async() => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("Db Connected Successfully."))
    .catch( (err) => {
        console.log("Db connection failed.");
        console.log(err);
        process.exit(1)
    })
}