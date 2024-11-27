const budgetBuddyService = require('../models/budgetBuddyService');

exports.getChallenge = async (req, res) => {
    const challenge = await budgetBuddyService.fetchChallenge();
    res.json(challenge);
};

exports.getTasks = async (req, res) => {
    const tasks = await budgetBuddyService.fetchTasks();
    res.json(tasks);
};

exports.getItems = async (req, res) => {
    console.log("params", req.params);
    
    const items = await budgetBuddyService.fetchItems(req.params.challengeId);
    res.json(items);
};

exports.getBadges = async (req, res) => {
    const badges = await budgetBuddyService.fetchBadges();
    res.json(badges);
};
