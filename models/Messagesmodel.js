const mongoose = require("mongoose");

const MessagesSchema = mongoose.Schema({
    message: {
        type: String,
        required: [true, "message is required"]
    },
    from: {
        type: String,
        required: [true, "from is required"]
    },
    to: {
        type: String,
        required: [true, "to is required"]
    },
    members: {
        type: String,
        required: [true, "members are required"]
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("Messages", MessagesSchema);