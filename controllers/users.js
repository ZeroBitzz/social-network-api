import User from '../models/User.js';


export const createUser = async (req, res, next) => {
  try {
    let {
      username,
      email
    } = req.body;

    username = username.trim().toLowerCase();
    email = email.trim().toLowerCase();

    const user = await User.findOne({
      username: username
    });

    if (user) return res.status(400).json({
      message: 'username already exists'
    });

    const newUser = new User({
      username,
      email
    });
    newUser.save();

    res.status(201).json(newUser);

  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, null, {
      limit: 100
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({
      message: 'user not found'
    });
    res.json(user);
  } catch (err) {
    res.status(400).json({
      message: 'error getting user'
    });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { email } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({
      message: 'user not found'
    });

    if (email) user.email = email;
    user.updatedAt = Date.now();

    user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const deletedUser = await User.deleteOne(user);
    res.json(deletedUser);
  } catch (err) {
    next(err);
  }
};

export const addFriend = async (req, res, next) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({
      message: 'user or friend not found'
    });

    user.friends.addToSet(friend);
    user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
}

export const deleteFriend = async (req, res, next) => {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({
      message: 'user or friend not found'
    });

    user.friends.pull(friend);
    user.save();

    res.json(user);
  } catch (err) {
    next(err);
  }
}