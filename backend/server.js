const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./app/routes').initializeRoutes(app);

sequelize.sync();

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});