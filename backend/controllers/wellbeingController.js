const db = require('../config/db');

// Get all topics
exports.getTopics = (req, res) => {
    db.query('SELECT * FROM wellbeing_topics', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// Get response by keywords (AI-like response)
exports.getResponse = async (req, res) => {
    const { inputText } = req.body;
    //const keywords = extractKeywords(inputText).join('|'); // Join keywords with '|' for REGEXP
    //console.log("keywords", keywords);
    const query = `
        SELECT response AS answer
        FROM knowledge_base
        WHERE keywords or question REGEXP ?
        ORDER BY RAND()
        LIMIT 1
    `;

    try {
        const response = await Promise.race([
            db.query(query, [inputText]),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Query timed out")), 5000))
        ]);

        const [rows] = response;
        console.log(rows[0].answer);

        if (rows.length > 0) {
            res.json({ answer: rows[0].answer });
        } else {
            res.json({ answer: "That's a great question! Let me think about it and get back to you." });
        }
    } catch (error) {
        console.error("Error fetching response:", error);
        res.status(500).json({ answer: "Oops, something went wrong! Please try again." });
    }
};
    function extractKeywords(inputText) {
        // Split input into words, remove common words and punctuation
        const words = inputText.toLowerCase().split(/\W+/);
        const commonWords = ["the", "is", "and", "or", "why", "how", "what", "where"];
        return words.filter(word => !commonWords.includes(word));
    }

