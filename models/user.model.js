const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'First name is required'],
        lowercase: true,
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'email is required'],
        validate: [validator.isEmail, 'Please provide a valid email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'passwrod is required'],
        minLength: [6, 'password at least minimum 6 charecter']
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verifyToken: String,
    verifyTokenExpiresDate: Date,
},
{
        timestamps: true,
})

userSchema.pre('save', function (next) {
    const bcryptHashPattern = /^\$2a\$[0-9]{1,2}\$[A-Za-z0-9/.]{53}$/;
    if (!bcryptHashPattern.test(this.password)) {
        const hashedPassword = bcryptjs.hashSync(this.password, 8);
        this.password = hashedPassword;
    }
    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;