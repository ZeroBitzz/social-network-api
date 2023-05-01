import express from 'express';
import {
  createThought,
  getThoughts,
  getThought,
  deleteThought,
  addReaction,
  deleteReaction,
} from '../controllers/thoughts.js';

const thoughtsRouter = express.Router();

thoughtsRouter.post('/', createThought);
thoughtsRouter.get('/', getThoughts);
thoughtsRouter.get('/:thoughtId', getThought);
thoughtsRouter.delete('/:thoughtId', deleteThought);

thoughtsRouter.post('/:thoughtId/reactions', addReaction);
thoughtsRouter.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export default thoughtsRouter;