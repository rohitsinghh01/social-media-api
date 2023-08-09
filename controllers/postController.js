const Post = require('../models/PostModel');

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
    const Post = await Post.findById(req.params.id);
    if (req.user._id === Post.user.toString() || req.user.role === 'admin') {
      await Comment.deleteMany({ user: req.user._id });
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
    const Post = await Post.findById(req.params.id);
    if (req.user._id === Post.user.toString()) {
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
    const Post = await Post.findById(req.params.id);
    if (!Post.likes.includes(req.user._id)) {
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
module.exports = { createPost, deletePost, updatePost, likeUnlike };
