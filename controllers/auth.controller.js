const bcryptjs = require('bcryptjs');
const CustomError = require("../utils/customError")
const authServices = require('../services/auth.service');
const { generateToken } = require("../utils/jwtToken");


exports.signup = async (req, res, next) => {
    try {
        const user = await authServices.signup(req.body);
        if (!user._id) {
            return next(new CustomError('user can\'t create', 400))

        }

        const { password, ...userInfo } = user.toObject();

        res.status(200).json({
            status: 'success',
            message: 'successfully sign up',
            data: userInfo,
        })
    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}

// login.............
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await authServices.getUserByEmailService(email);
        // check the user is exist
        if (!user) {
            const error = new CustomError('User not found, sign up first', 404)
            return next(error)
        }

        // compare user password
        const isValidPassword = bcryptjs.compareSync(password, user.password);

        if (!isValidPassword) {
            const error = new CustomError('invalid email or password, try currect', 400)
            return next(error)
        }

        // call the generate token function for create a token
        const token = generateToken(user);

        const { password: pwd, ...userInfo } = user.toObject();

        res.status(200).json({
            status: 'success',
            message: 'successfully login',
            data: {
                userInfo,
                token
            },
        })



    } catch (error) {
        next(new CustomError(error.message, 400))
    }
}