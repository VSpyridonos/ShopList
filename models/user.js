const mongoose = require('mongoose');
const List = require('./list');
const Count = require('./count');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    list: Schema.Types.ObjectId,
    address: String,
    count: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Count'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
