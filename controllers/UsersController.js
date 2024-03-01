const asyncHandler = require("express-async-handler");
const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = asyncHandler( async (req, res) => {
    const users = await UsersModel.find();
    res.status(200).json(users);
});

const getSingleUser = asyncHandler(async (req, res) => {
    const user = await UsersModel.findById(req.params.id);
    if(!user){
        res.status(404);
        throw new Error("User Not Found")
    }
    res.status(200).json(user);
});

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, phone, password }= req.body;
    if(!username || !email || !phone || !password){
        res.status(401);
        throw new Error("All Fields are required!!");
    }
    const hashPass = await bcrypt.hash(password, 10);
    const user = await UsersModel.create({
        username,
        email,
        phone,
        password: hashPass
    });
    res.status(200).json({ message: "User Created!!" });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UsersModel.findOne({ email });
    if(!user){
        res.status(404);
        throw new Error("User Not Found")
    }
    const compare = await bcrypt.compare(password, user.password);
    if(compare === true){
        const accessToken = jwt.sign({
            user: {
                id: user._id,
                email: user.email,
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "7d" }
        );
        const data = {
            jwt: accessToken,
            id: user._id
        }
        res.status(200).json(data);
    }
    else{
        res.status(401);
        throw new Error("Invalid password");
    }
});

const getCurrUser = asyncHandler(async (req, res) => {
    const user = await UsersModel.findById(req.user.id);
    res.status(200).json(user);
});

module.exports = { getAllUsers, getSingleUser, getCurrUser, loginUser, registerUser };