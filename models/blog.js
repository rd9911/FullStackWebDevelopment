const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    comments: [],
    user: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}); // you can remove _id by {id: false}

blogSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString();
        returnedObj.likes = returnedObj.likes ? returnedObj.likes : 0;
        delete returnedObj._id;
        delete returnedObj.__v;
    }
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;