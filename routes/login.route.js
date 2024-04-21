const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

const secretKey = process.env.SECRETKEY;


const { connectDB } = require("../database/connectDB");
const collectionName = "users";

const main = async (userDetails) => {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const user = await collection
        .find({ emailid: userDetails.userEmail })
        .toArray();
    if (user[0] == undefined) {
        return {result : "Invaild User"};
    } else {
        let payload = {
            id : user[0]['_id']
        }
        // let serverResponse = {};
        const isPasswordMatched = await bcrypt.compare(userDetails.userPassword, user[0]['password']);
        if (isPasswordMatched === true) {
            return new Promise((resolve, reject) => {
                jwt.sign(payload, secretKey, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ result : "Login Success!", token: token });
                    }
                });
            });
            /*
           jwt.sign(payload, secretKey,{ expiresIn: '1h'}, 
                (err, token) => {
                    if (err){
                        throw err
                    } else {
                        // serverResponse.response = "Login Success!";
                        // serverResponse.token = token;
                        // console.log("serverResponse: " + JSON.stringify(serverResponse));
                        return { token: token };
                    }
                }
            )
            */
        } else {
            return {result : "Invalid Password"};
        }
    }
};

router.post("/", async (req, res) => {
    try {
        const result = await main(req.body);
        // console.log("result from /Login : " + JSON.stringify(result));
        res.send(result);
    } catch (err) {
        console.log("+++Error:- " + err);
        res.send("Error: " + err);
    }
});

module.exports = router;
