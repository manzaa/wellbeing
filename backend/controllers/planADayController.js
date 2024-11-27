const planADayService = require('../models/planADayService');

exports.getChallenge = async (req, res) => {
    const challenge = await planADayService.fetchChallenge();
    res.json(challenge);
};

exports.getActivities = async (req, res) => {
    const activities = await planADayService.fetchActivities();
    res.json(activities);
};

exports.getSchedule = async (req, res) => {
    const { userId } = req.params;
    const schedule = await planADayService.fetchSchedule(userId);
    res.json(schedule);
};

exports.updateSchedule = async (req, res) => {
    const { userId } = req.params;
    const { activity_id, scheduled_time } = req.body;
    await planADayService.updateSchedule(userId, activity_id, scheduled_time);
    res.json({ message: 'Schedule updated successfully' });
};

exports.getBadges = async (req, res) => {
    const { userId } = req.params;
    const badges = await planADayService.fetchBadges(userId);
    res.json(badges);
};
