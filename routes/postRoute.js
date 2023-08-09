const router = require('express').Router();
const {
  createPost,
  deletePost,
  updatePost,
  likeUnlike,
} = require('../controllers/postController');
const { verifyAccessToken } = require('../utils/jwtToken');
router.post('/', verifyAccessToken, createPost);
router.put('/:id', verifyAccessToken, updatePost);
router.delete('/:id', verifyAccessToken, deletePost);
router.get('/:id/like', verifyAccessToken, likeUnlike);

module.exports = router;
