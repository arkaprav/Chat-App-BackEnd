const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        index: {
            unique: true,
            sparse: true
        }
    },
    email: {
        type: String,
        required: [true, "email is required"],
        index: {
            unique: true,
            sparse: true
        }
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        index: {
            unique: true,
            sparse: true
        }
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
},{
    timestamps: true,
});

module.exports = mongoose.model("Users", UserSchema);