const mongo = require('./mongoDBConnection');

const schema = new mongo.Schema({

    userId: String,
    userName: String,
    account: { type: String, default: 'public' },
    likes: [{
        type: String
    }],
    image: String
}, {
    timestamps: true
});


const repo = mongo.model("UsersUploadImages", schema);

module.exports = repo;
