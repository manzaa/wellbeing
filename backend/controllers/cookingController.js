const db = require('../config/db');

exports.getRandomChallenge = async (req, res) => {
    const { mealType } = req.query;
    try {
        const [challenge] = await db.query(`
            SELECT id, meal_type, title, description, ingredients, steps 
            FROM cooking_challenges 
            WHERE meal_type = ? 
            ORDER BY RAND() LIMIT 1
        `, [mealType]);

        console.log("challenge", challenge[0].ingredients);
        if (challenge) {
            challenge.ingredients = challenge[0].ingredients;
            challenge.steps = challenge[0].steps;
        }

        res.json({ challenge });
    } catch (error) {
        console.error("Error fetching challenge:", error);
        res.status(500).json({ error: "Failed to fetch challenge" });
    }
};
