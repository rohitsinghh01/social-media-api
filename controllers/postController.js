const Post = require('../models/PostModel');
const commentModel = require('../models/commentModel');
const userModel = require('../models/userModel');

// create a new Post
const createPost = async (req, res) => {
  req.body.user = req.user._id;
  const newPost = new Post(req.body);
  try {
    await newPost.save();
    res.status(200).send({
      status: 'success',
      message: 'Post uploaded',
    });
  } catch (e) {
    res.status(500).send({
      status: 'failed in uplodaing your Post',
      message: e.message,
    });
  }
};

// delete a Post
const deletePost = async (req, res) => {
  try {
    const Posts = await Post.findById(req.params.id);
    if (req.user._id === Posts.user.toString() || req.user.role === 'admin') {
      await commentModel.deleteMany({ user: req.user._id });
      await Post.findByIdAndDelete(req.params.id);
      res.status(200).send({
        status: 'success',
        message: 'Post deleted',
      });
    } else {
      res.status(401).send({
        status: 'failure',
        message: 'you are not authorized',
      });
    }
  } catch (e) {
    res.status(500).send({
      status: 'failure',
      message: e.message,
    });
  }
};

// update a Post
const updatePost = async (req, res) => {
  try {
    const Posts = await Post.findById(req.params.id);
    if (req.user._id === Posts.user.toString()) {
      await Post.updateOne({ $set: req.body });
      res.status(200).send({
        status: 'success',
        message: 'Post updated',  
      });
    } else {
      res.status(401).send({
        status: 'failure',
        message: 'you are not authorized',
      });
    }
  } catch (e) {
    res.status(500).send({
      status: 'failure',
      message: e.message,
    });
  }
};
// like and unlike a Post
const likeUnlike = async (req, res) => {
  try {
    const Posts = await Post.findById(req.params.id);
    if (!Posts.likes.includes(req.user._id)) {
      await Post.updateOne({ $push: { likes: req.user._id } });
      res.status(200).send({
        status: 'success',
        message: 'Post liked',
      });
    } else {
      await Post.updateOne({ $pull: { likes: req.user._id } });
      res.status(200).send({
        status: 'success',
        message: 'Post disliked',
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 'failure',
      message: e.message,
    });
  }
};

const aggregation = async (req, res) => {
  try {
    const allPosts = await Post.find();
    const Post_count = {};

    allPosts.forEach((post) => {
      if (!Post_count[post.user]) {
        Post_count[post.user] = 1;
      } else {
        Post_count[post.user]++;
      }
    });

    const user = await userModel.find({}, '_id');
    // console.log(user)
    user.forEach((post) => {
      if (!Post_count[post._id]) {
        Post_count[post._id] = 0;
      }
    });

    const User_Post_Counts = [];
    for (const userId in Post_count) {
      const user = await userModel.findById(userId);
      if (user) {
        User_Post_Counts.push({
          _id: user._id,
          username: user.username,
          postCount: Post_count[userId],
        });
      }
    }

    res.status(200).json(User_Post_Counts);
  } catch (e) {
    res.status(500).send({
      status: 'failure',
      message: e.message,
    });
  }
};
module.exports = {
  createPost,
  deletePost,
  updatePost,
  likeUnlike,
  aggregation,
};
