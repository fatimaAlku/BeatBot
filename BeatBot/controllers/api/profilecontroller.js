import User from '../../models/user.js';
import jwt from 'jsonwebtoken';

const profileController = {
  async getProfile(req, res, next) {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (err) {
      next(err);
    }
  },
  async updateProfile(req, res, next) {
    try {
      if (!req.user || !req.user._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const { name } = req.body || {};
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ message: 'Name is required' });
      }

      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { name: name.trim() },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      const token = jwt.sign(
        { sub: updatedUser._id.toString(), email: updatedUser.email, name: updatedUser.name },
        process.env.SECRET,
        { expiresIn: '24h' }
      );

      res.json({ user: updatedUser, token });
    } catch (err) {
      next(err);
    }
  },
};

export default profileController;
