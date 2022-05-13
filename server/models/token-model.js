const {Schema, model} = require('mongoose');

const TokenShchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
})

module.exports = model('Token', TokenShchema);