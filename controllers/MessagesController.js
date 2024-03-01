const asyncHandler = require("express-async-handler");

const MessagesModel = require("../models/Messagesmodel");

const getAllMessages = asyncHandler(async (req, res) => {
    const messages = await MessagesModel.find();
    res.status(200).json(messages);
});

const getOne2OneMessages = asyncHandler(async (req, res) => {
    const members = JSON.stringify([req.user.id, req.params.id]);
    const messages = await MessagesModel.find({ members });
    res.status(200).json(messages);
});

module.exports = { getAllMessages, getOne2OneMessages };