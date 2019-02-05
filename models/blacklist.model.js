const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlacklistsSchema = new Schema({
    recipient: {
        index: {
            unique: true
        },
        required: true,
        type: String
    }
}, { timestamps: true})

BlacklistsSchema
    .virtual('url')
    .get(function () {
        return '/smsAdmin/blacklist/' + this._id;
    });

//Export model
module.exports = mongoose.model('blacklist', BlacklistsSchema);