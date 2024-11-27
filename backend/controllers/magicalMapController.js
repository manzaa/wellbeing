const db = require('../config/db');

exports.getLocations = async (req, res) => {
    const locations = await db.query('SELECT * FROM locations');
    res.json(locations);
};

exports.getUserProgress = async (req, res) => {
    const { userId } = req.params;
    const progress = await db.query(
        'SELECT * FROM user_progress WHERE user_id = ?',
        [userId]
    );
    res.json(progress);
};

exports.completeActivity = async (req, res) => {
    const { userId, locationId } = req.body;
    await db.query(
        'UPDATE user_progress SET points = points + 5 WHERE user_id = ? AND location_id = ?',
        [userId, locationId]
    );
    await db.query(
        'UPDATE locations SET is_locked = FALSE WHERE id = ?',
        [locationId + 1] // Unlock the next location
    );
    res.json({ message: 'Activity completed and next location unlocked!' });
};

// New function to get activities for a specific location
exports.getActivitiesByLocation = async (req, res) => {
    const { locationId } = req.params;
    try {
        const [rows] = await db.query(
            'SELECT * FROM activities_locations WHERE location_id = ?',
            [locationId]
        );
        res.json(rows);
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Error fetching activities' });
    }
};
