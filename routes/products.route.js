const express = require('express');
const route = express.Router()

const middleware = require('../middleware');

const { connectDB } = require("../database/connectDB");
const collectionName = "users";

async function main(){
    const db = await connectDB();
    const collection = db.collection(collectionName);
    const user = await collection.findById();
    return user;
}

route.get("/", middleware ,async(req, res) => {
    try{
        let exist = await main(req.user.id);
        if(!exist){
            return res.status(400).send('User not found');
        }
        res.json(exist);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

module.exports = route;