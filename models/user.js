
const { Schema, model } = require("mongoose");
const bCrypt = require("bcryptjs");
// const timespan = require("jsonwebtoken/lib/timespan");

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: [true, "Email required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password required"]
    }
},
    { timestamps: true });

userSchema.methods.setPassword = function (password) {
    this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.password);
};

const User = model("user", userSchema);

module.exports = User;
