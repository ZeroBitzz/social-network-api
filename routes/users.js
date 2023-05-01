import express from 'express';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} from '../controllers/users.js';

const usersRouter = express.Router();

usersRouter.post('/', createUser);
usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUser);
usersRouter.put('/:userId', updateUser);
usersRouter.delete('/:userId', deleteUser);

usersRouter.post('/:userId/friends/:friendId', addFriend);
usersRouter.delete('/:userId/friends/:friendId', deleteFriend);

export default usersRouter;
