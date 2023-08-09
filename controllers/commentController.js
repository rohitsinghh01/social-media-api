const Comment = require('../models/commentModel');
const Post = require('../models/PostModel');

const addComment = async (req, res) => {
  try {
    const { PostId, ...comment } = req.body;
    comment.user = req.user._id;
    const commenttosave = new Comment(comment);
    const savedcomment = await commenttosave.save();
    await Post.findOneAndUpdate(
      { _id: PostId },
      { $push: { comment: savedcomment._id } }
    );
    res.status(200).send({
      status: 'success',
      message: 'Comment created',
    });
  } catch (e) {
    res.status(500).send({
      status: 'failure',
      message: e.message,
    });
  }
};

module.exports = { addComment };
