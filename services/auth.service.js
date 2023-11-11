const User = require("../models/user.model")

exports.signup = async(data) => {
    const result = await User.create(data)
    return result
}

exports.getUserByEmailService = async(email) => {
    const result = await User.findOne({email})
    return result
}