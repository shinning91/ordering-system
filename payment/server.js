const app = require("./src/app");
const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");

mongoose.connect(DB_URI);

app.listen(3000, () => {
    console.log("payment service running on port 3001");
})