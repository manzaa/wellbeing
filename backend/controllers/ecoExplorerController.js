const ecoExplorerService = require('../models/ecoExplorerService');

exports.getChallenge = async (req, res) => {
    const challenge = await ecoExplorerService.fetchChallenge();
    res.json(challenge);
};

exports.getNatureItems = async (req, res) => {
    const items = await ecoExplorerService.fetchNatureItems();
    res.json(items);
};

exports.getSightings = async (req, res) => {
    const { userId } = req.params;
    const sightings = await ecoExplorerService.fetchSightings(userId);
    res.json(sightings);
};

exports.logSighting = async (req, res) => {
    const { userId } = req.params;
    const { item_id, location, notes } = req.body;
    await ecoExplorerService.logSighting(userId, item_id, location, notes);
    res.json({ message: 'Sighting logged successfully' });
};

exports.getBadges = async (req, res) => {
    const { userId } = req.params;
    const badges = await ecoExplorerService.fetchBadges(userId);
    res.json(badges);
};
