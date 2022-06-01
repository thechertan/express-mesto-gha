const { errors, celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getUser, getUsers, updateProfile, updateAvatar, getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().max(24).min(24),
  }).unknown(false),
}), getUser);

router.get('/', getUsers);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    about: Joi.string().required(),
  }).unknown(false),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }).unknown(true),
}), updateAvatar);

router.use(errors());

module.exports.userRouter = router;
