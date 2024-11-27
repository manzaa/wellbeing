const feelingsFriendService = require('../models/feelingsFriendService');

exports.getChallenge = async (req, res) => {
    const challenge = await feelingsFriendService.fetchChallenge();
    res.json(challenge);
};

exports.getEmotions = async (req, res) => {
    const emotions = await feelingsFriendService.fetchEmotions();
    res.json(emotions);
};

exports.getEmotionalLogs = async (req, res) => {
    const { userId } = req.params;
    const logs = await feelingsFriendService.fetchEmotionalLogs(userId);
    res.json(logs);
};

exports.logEmotion = async (req, res) => {
    const { userId } = req.params;
    const { emotion_id, comment } = req.body;
    await feelingsFriendService.logEmotion(userId, emotion_id, comment);
    res.json({ message: 'Emotion logged successfully' });
};

exports.getBadges = async (req, res) => {
    const { userId } = req.params;
    const badges = await feelingsFriendService.fetchBadges(userId);
    res.json(badges);
};
