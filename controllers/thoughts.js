import Thought from '../models/Thought.js';
import ReactionSchema from '../models/Thought.js';
import User from '../models/User.js';

export const createThought = async (req, res, next) => {
  try {
    const {
      thoughtText,
      username,
      userId
    } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({
      message: 'user not found'
    });

    const thought = await Thought.create({
      thoughtText,
      username,
      userId
    });

    user.thoughts.addToSet(thought);
    user.save();

    res.status(201).json(thought);

  } catch (err) {
    next(err);
  }
}

export const getThoughts = async (req, res, next) => {
  try {
    const thoughts = await Thought.find({}, null, {
      limit: 100
    });
    res.json(thoughts);
  } catch (err) {
    next(err);
  }
}

export const getThought = async (req, res, next) => {
  try {
    const {
      thoughtId
    } = req.params;
    const thought = await Thought.findById(thoughtId);
    if (!thought) return res.status(404).json({
      message: 'thought not found'
    });
    res.json(thought);
  } catch (err) {
    res.status(400).json({
      message: 'error getting thought'
    });
  }
}

export const deleteThought = async (req, res, next) => {
  try {
    const {
      thoughtId
    } = req.params;
    const thought = await Thought.findByIdAndDelete(thoughtId);
    if (!thought) return res.status(404).json({
      message: 'thought not found'
    });
    res.json(thought);
  } catch (err) {
    next(err);
  }
}

export const addReaction = async (req, res, next) => {
  try {
    const {
      thoughtId
    } = req.params;
    const {
      reactionBody,
      username
    } = req.body;

    const thought = await Thought.findById(thoughtId);

    if (!thought) return res.status(404).json({
      message: 'thought not found'
    });

    const reaction = {
      reactionBody,
      username
    };

    console.log(reaction)

    thought.reactions.addToSet(reaction);
    thought.save();

    res.json(thought);
  } catch (err) {
    next(err);
  }
}


export const deleteReaction = async (req, res, next) => {
  try {
    const {
      thoughtId,
      reactionId
    } = req.params;

    const thought = await Thought.findById(thoughtId);
    if (!thought) return res.status(404).json({
      message: 'thought not found'
    });

    const reaction = thought.reactions.id(reactionId);

    if (!reaction) return res.status(404).json({
      message: 'reaction not found'
    });
    console.log(reaction)

    thought.reactions.pull(reaction);
    thought.save();

    res.json(thought);
  } catch (err) {
    next(err);
  }
}