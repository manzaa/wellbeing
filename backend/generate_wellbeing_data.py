import random

# Define the 30 topics and related sample descriptions
topics = [
    ('Physical Activity', 'Tips and activities to keep kids active'),
    ('Healthy Eating', 'Guidance on balanced diets and healthy food choices'),
    ('Hydration', 'Importance of drinking water and staying hydrated'),
    ('Sleep', 'Advice on sleep routines and rest'),
    ('Stress Management', 'Ways to cope with stress and anxiety'),
    ('Friendship', 'Making and maintaining friendships'),
    ('Self-Esteem', 'Building confidence and self-worth'),
    ('Safety', 'Basic safety and first aid guidance'),
    ('Emotional Awareness', 'Recognizing and managing emotions'),
    ('Digital Balance', 'Managing screen time and online habits'),
    ('Kindness', 'Learning to be kind to others'),
    ('Mindfulness', 'Practicing mindfulness and focus'),
    ('Confidence', 'Tips to improve self-confidence'),
    ('Patience', 'Learning to wait and be patient'),
    ('Honesty', 'Importance of being honest'),
    ('Creativity', 'Encouraging creativity and new ideas'),
    ('Environmental Awareness', 'Caring for the environment'),
    ('Physical Health', 'Taking care of the body'),
    ('Mental Health', 'Staying mentally healthy'),
    ('Social Skills', 'Developing social skills and empathy'),
    ('Empathy', 'Understanding others\' feelings'),
    ('Goal Setting', 'Setting and achieving personal goals'),
    ('Self-Control', 'Practicing self-discipline'),
    ('Learning New Skills', 'Trying out new activities'),
    ('Decision Making', 'Making good choices'),
    ('Problem Solving', 'Finding solutions to challenges'),
    ('Courage', 'Facing fears and challenges'),
    ('Respect', 'Respecting oneself and others'),
    ('Gratitude', 'Appreciating what we have'),
    ('Time Management', 'Using time wisely')
]

# Define sample questions, keywords, and responses
sample_questions = [
    "What should I do if I feel {emotion}?",
    "How can I {activity} safely?",
    "Why is it important to {action}?",
    "What does it mean to {concept}?",
    "Can you give me tips on {topic}?",
]

sample_responses = [
    "Remember, it's okay to feel this way.",
    "One way to approach this is by starting small.",
    "You could try practicing this daily.",
    "Remember to talk to an adult if you're unsure.",
    "Taking breaks can help improve focus.",
    "Drink water regularly to stay hydrated!",
    "Get outside and enjoy fresh air whenever possible.",
    "Try to sleep on time to feel rested.",
    "Helping others is a great way to feel positive.",
    "Exercise helps keep your mind and body healthy.",
]

# Generate SQL insert statements
sql_statements = []

# Insert topics into wellbeing_topics table
for i, (topic_name, description) in enumerate(topics, start=1):
    sql_statements.append(f"INSERT INTO wellbeing_topics (id, topic_name, description) VALUES ({i}, '{topic_name}', '{description}');")

# Generate 1000 entries for knowledge_base table
for entry_id in range(1, 10001):
    # Select a random topic and response type
    topic_id = random.randint(1, len(topics))
    question = random.choice(sample_questions).format(
        emotion=random.choice(["sad", "happy", "anxious", "angry"]),
        activity=random.choice(["run", "jump", "play"]),
        action=random.choice(["help others", "stay healthy"]),
        concept=random.choice(["be kind", "respect others"]),
        topic=topics[topic_id - 1][0].lower()
    )
    keywords = ','.join(random.sample(["exercise", "sleep", "rest", "eat healthy", "healthy food", "balanced diet", "hydration", "drink water", "wellness", "happiness", "sadness", "anger", "fear", "courage", "kindness", "respect", "sharing", "honesty", "study habits", "homework", "learning", "focus", "concentration", "organization", "goal setting", "motivation", "curiosity", "self-esteem", "confidence", "energy", "stretching", "warm-up", "physical activity", "sports", "soccer", "basketball", "running", "playtime", "relaxation", "meditation", "mindfulness", "stress relief", "deep breathing", "family", "friends", "school", "teacher", "friendship", "teamwork", "cooperation", "gratitude", "thankfulness", "apology", "forgiveness", "coping skills", "bullying", "peer pressure", "self-control", "safe behavior", "safety", "stranger danger", "emergency", "call for help", "first aid", "road safety", "internet safety", "screen time", "technology use", "hygiene", "washing hands", "brushing teeth", "taking a shower", "cleanliness", "responsibility", "chores", "pet care", "gardening", "nature", "environment", "recycling", "eco-friendly", "conservation", "animals", "plants", "outdoor activities", "imagination", "creativity", "art", "drawing", "painting", "writing", "reading", "storytelling", "vocabulary", "language skills", "listening", "speaking", "patience", "empathy", "support", "helping others", "volunteering", "social skills", "problem solving", "decision making", "respect boundaries", "emotional expression", "feelings", "positive thinking", "resilience", "adaptability", "overcoming fear", "trying new things", "change", "persistence", "challenge", "mental health", "calm", "relaxing music", "journaling", "self-reflection", "healthy habits", "time management", "healthy routines", "stretching exercises", "morning routine", "bedtime routine", "good habits", "nature walk", "focus practice", "self-discipline", "emotional balance", "social awareness", "community", "family bonding", "celebrate achievements", "personal growth", "new skills", "healthy relationships", "making friends", "kindness acts", "thoughtful gestures", "positive affirmations", "self-love", "positive mindset", "caring for others", "compliment", "gratitude journaling", "self-care", "emotions check-in", "reflect on feelings", "hobby exploration", "skill practice", "body awareness", "spatial awareness", "healthy limits", "setting boundaries", "making choices", "self-awareness", "active listening", "goal achievements", "reward system", "studying", "school readiness", "homework help", "learning skills", "reading books", "spelling", "math practice", "science", "history", "geography", "art skills", "music skills", "dance", "theater", "empathy practice", "self-improvement", "responsible behavior", "group play", "mindful eating", "mindfulness exercises", "gratitude practice", "reflection", "family time", "rules", "respect elders", "helping parents", "supporting friends", "gardening skills", "recycling practice", "planet care", "nature appreciation", "animal care", "personal space", "decision process", "friendship building", "sportsmanship", "fitness", "stretching", "endurance", "flexibility", "strength", "coordination", "teamwork activity", "self-motivation", "project completion", "small wins", "good deeds", "handling mistakes", "managing emotions", "healthy snacks", "portion control", "managing frustration", "learning patience", "waiting turns", "organizing toys", "reading practice", "art projects", "music appreciation", "personal interests", "cooking help", "basic cooking", "baking", "understanding feelings", "recognizing emotions", "family relationships", "sibling support", "honesty practice", "telling truth", "learning from mistakes", "saying sorry", "supporting others", "learning sharing", "kind words", "speaking politely", "basic first aid", "emergency contact", "safe adults", "safe friends", "independence", "planning", "journaling feelings", "positive feedback", "family support", "hugging", "petting animals", "planting", "recycling crafts", "reuse items", "thank you", "please", "excuse me", "understanding consequences", "appreciation", "environmental responsibility", "saving energy", "wasting less", "self-appreciation", "accomplishment", "practice gratitude", "perseverance", "anti-bullying", "self-advocacy", "voice opinions", "inclusion", "recognizing uniqueness", "identifying strengths", "self-worth", "avoid risky behavior", "self-check-in", "self-questioning", "reflection practice", "academic goals", "emotional goals", "physical goals", "health goals", "family goals", "social goals", "skill goals", "playing fair", "following rules", "trust", "feeling safe", "safe choices", "kindness to others", "eco habits", "planning meals", "food groups", "portioning meals", "eating variety", "hydration importance", "limiting sugar", "avoiding junk food", "sleep importance", "bedtime rituals", "quiet time", "respecting nature", "being kind to animals", "team effort", "encouraging others", "self-challenge", "learning from others", "caring gestures", "responsibility to self", "independent play", "active role", "buddy system", "self-pride", "sharing space", "understanding diversity", "learning about cultures", "respecting differences", "recycling habits", "importance of learning", "listening skills", "feeling connected", "achieving small goals", "doing best", "learning games", "learning fun", "exploring topics", "learning deeply", "lifelong learning", "celebrating little wins", "planning next steps", "saving resources", "goal visualization", "protecting environment", "saying no", "managing anxiety", "self-belief", "self-kindness", "gratitude for family", "gratitude for friends", "comfort in family", "mental break", "focus games", "stress management", "pet care importance", "limiting screen time", "being creative", "family traditions", "understanding seasons", "weather change", "self-regulation", "taking pause", "doing things well", "helping elders", "supporting siblings", "peer support", "navigating feelings", "honoring commitments", "knowing personal strengths", "inspiring others", "respecting others", "self-reward", "meal planning", "staying consistent", "physical care", "wellness routine", "health check-in", "exercise fun", "fitness focus", "supporting classmates", "kindness challenge", "encouragement", "asking for help", "celebrating diversity", "embracing challenges", "clean surroundings", "personal best", "learning motivation", "building community", "positive feedback", "managing energy", "balance activity", "setting small goals", "regular exercise", "food safety", "daily gratitude", "encouraging growth", "patience practice", "friendship bonds", "supporting classmates", "positivity", "self-reflection", "family joy", "hobby dedication", "kindness to self", "choosing wisely", "safe habits", "celebrating friendships", "support network", "handling disappointment", "supporting animals", "valuing self", "making lists", "practicing new things", "learning enthusiasm", "building courage", "enjoying outdoors", "fresh air", "outdoor play", "family movie night", "playing board games", "home chores", "tidy space", "eco-friendly habits", "respecting plants", "water plants", "eco club", "nature preservation", "climate awareness", "self-expression", "art club", "music group", "food preparation", "math fun", "science curiosity", "respecting rules", "community service", "self-respect", "body respect", "planning projects", "weekend planning", "downtime", "relaxing with music", "favorite book", "new hobby", "acting kindly", "sharing smiles", "comforting", "healthy decisions", "happy heart", "saying no to junk food", "staying clean", "regular check-ups", "avoiding arguments", "respecting pets", "pet responsibility", "reducing waste", "goal reminders", "positive affirmations", "creative self", "handling peer pressure", "taking initiative", "spending time with family", "memory keeping", "celebrating moments", "planning goals", "staying mindful", "positive mindset", "animal welfare", "personal hygiene", "balanced meals", "regular hydration", "mindful decisions", "expressing gratitude", "outdoor activities", "climate change", "creativity", "self-confidence", "honesty importance", "thankfulness", "positive thoughts", "eating habits", "value health", "teamwork", "family fun", "kind acts", "smile", "helpfulness", "reliability", "self-care steps", "respect others", "family support system", "child safety", "mental clarity", "supporting classmates", "character building", "honesty", "generosity", "physical activity", "emotional balance"
], 3))
    response = random.choice(sample_responses)
    response_type = random.choice(['tip', 'suggestion', 'activity', 'support'])

    # Add SQL insert for knowledge_base
    sql_statements.append(f"INSERT INTO knowledge_base (id, topic_id, keywords, question, response, response_type) VALUES "
                          f"({entry_id}, {topic_id}, '{keywords}', '{question}', '{response}', '{response_type}');")

# Write to SQL file
with open("wellbeing_data.sql", "w") as file:
    file.write("\n".join(sql_statements))

print("SQL file 'wellbeing_data.sql' generated with 1000 entries.")
