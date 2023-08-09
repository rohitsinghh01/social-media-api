const router = require('express').Router();
const {
  createPost,
  deletePost,
  updatePost,
  likeUnlike,
  aggregation,
} = require('../controllers/postController');
const { verifyAccessToken } = require('../utils/jwtToken');
router.post('/', verifyAccessToken, createPost);
router.put('/:id', verifyAccessToken, updatePost);
router.delete('/:id', verifyAccessToken, deletePost);
router.get('/:id/like', verifyAccessToken, likeUnlike);
router.get('/aggregation', verifyAccessToken, aggregation);


module.exports = router;
