const Achievement = require('../models/achievements');

exports.getUserAchievements = async (req, res) => {
  try {
    const { option } = req.query;
    const { email } = req.user;

    // Fetch user achievements based on the selected option and email
    const userAchievements = await Achievement.findOne({ email });

    if (!userAchievements || !userAchievements[option]) {
      return res.status(404).json({ error: `Achievements not found for the user or option` });
    }

    const optionAchievements = userAchievements[option];

    res.status(200).json(optionAchievements);
  } catch (error) {
    console.error('Error fetching user achievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




