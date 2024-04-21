const express = require("express");
var cors = require('cors');

const UserSignup = require("./routes/signup.route");
const UserLogin = require("./routes/login.route");
const Products = require("./routes/products.route");

const app = express();
app.use(cors(
    {
        origin : "*"
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//   ============= Routes Configuration =============
app.use("/Signup", UserSignup);
app.use("/Login", UserLogin);
app.use("/Products", Products)


app.listen(8081, () => {
    console.log("Server is running at http://localhost:8081");
});
