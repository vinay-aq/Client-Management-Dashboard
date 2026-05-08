const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,ref:"Users", required: true},
    refreshToken:{type: String},
    expiresAt:{type: Date, required: true}
}, {timestamps: true})

const refreshTokenModel = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = refreshTokenModel;