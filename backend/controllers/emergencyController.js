const emergencyService = require('../models/emergencyService');

exports.getChallenge = async (req, res) => {
    const challenge = await emergencyService.fetchChallenge();
    res.json(challenge);
};

exports.getScenarios = async (req, res) => {
    const scenarios = await emergencyService.fetchScenarios();
    res.json(scenarios);
};

exports.submitResponse = async (req, res) => {
    const { userId } = req.params;
    const { scenario_id, action_id } = req.body;
    const result = await emergencyService.evaluateResponse(userId, scenario_id, action_id);
    res.json(result);
};

exports.getBadges = async (req, res) => {
    const { userId } = req.params;
    const badges = await emergencyService.fetchBadges(userId);
    res.json(badges);
};

exports.getScore = async (req, res) => {
    const { userId } = req.params;
    const score = await emergencyService.fetchScore(userId);
    res.json(score);
};
