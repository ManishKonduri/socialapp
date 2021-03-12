const mongo = require('./mongoDBConnection');

const schema = new mongo.Schema({

    userId: String,
    userName: String,
    likes: [{
        type: String
    }]
}, {
    timestamps: true
});


const repo = mongo.model("ImageLikes", schema);

module.exports = repo;
