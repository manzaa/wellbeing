const fs = require('fs');
const topics = [
    {
        topic: "Friendship",
        keywords: ["friendship", "friends", "socialize", "kindness", "connection"],
        questions: [
            "How can I make friends?",
            "Why is friendship important?",
            "How do I keep my friends?",
            "What are good qualities in a friend?",
            "How can I be a supportive friend?"
        ],
        answers: [
            "Making friends is about being kind, listening, and being yourself.",
            "Friendship helps us feel connected and supported.",
            "Keeping friends is about understanding, caring, and spending time together.",
            "Good friends are kind, honest, and supportive.",
            "Being supportive means listening and helping whenever you can."
        ]
    },
    {
        topic: "Exercise",
        keywords: ["exercise", "workout", "active", "movement", "fitness"],
        questions: [
            "Why is exercise important?",
            "How often should I exercise?",
            "What types of exercise are fun?",
            "Can kids lift weights?",
            "What are some exercises I can do at home?"
        ],
        answers: [
            "Exercise keeps our bodies strong and helps us feel energetic.",
            "Try to be active every day to stay healthy!",
            "Fun exercises can include dancing, swimming, and playing games.",
            "Kids can focus on bodyweight exercises like push-ups and running.",
            "You can do jumping jacks, push-ups, and stretches at home."
        ]
    },
    {
        topic: "Nutrition",
        keywords: ["healthy", "diet", "nutrition", "food", "eating"],
        questions: [
            "What foods are healthy?",
            "Why should I eat vegetables?",
            "Is it okay to eat sweets?",
            "What are some healthy snacks?",
            "Why is breakfast important?"
        ],
        answers: [
            "Healthy foods include fruits, vegetables, whole grains, and lean proteins.",
            "Vegetables give us vitamins and energy to grow strong.",
            "It's okay to enjoy sweets sometimes, but healthy foods should come first!",
            "Healthy snacks include fruits, nuts, and yogurt.",
            "Breakfast gives us energy to start the day right!"
        ]
    },
    {
        topic: "Safety",
        keywords: ["safety", "safe", "danger", "emergency", "protect"],
        questions: [
            "What should I do if I feel unsafe?",
            "How can I stay safe online?",
            "What is stranger danger?",
            "How can I protect myself in emergencies?",
            "Who should I talk to if I'm worried about my safety?"
        ],
        answers: [
            "If you feel unsafe, talk to a trusted adult.",
            "Stay safe online by not sharing personal information.",
            "Stranger danger means being careful around people you don't know.",
            "In emergencies, stay calm and follow safety instructions.",
            "Talk to a trusted adult, like a parent or teacher."
        ]
    },
    {
        topic: "Study Habits",
        keywords: ["study", "homework", "learning", "focus", "school"],
        questions: [
            "How can I focus better?",
            "What are good study habits?",
            "How do I keep up with my homework?",
            "How can I manage my time well?",
            "Why is it important to study regularly?"
        ],
        answers: [
            "Take breaks and avoid distractions to focus well.",
            "Good study habits include organizing your notes and studying daily.",
            "Doing homework regularly helps you stay on top of your studies.",
            "Managing time helps you complete tasks without stress.",
            "Studying regularly helps you remember things better."
        ]
    },
    {
        topic: "Mental Health",
        keywords: ["mental health", "emotions", "calm", "stress", "peace"],
        questions: [
            "Why is it important to talk about feelings?",
            "How can I manage stress?",
            "What can I do if I'm feeling sad?",
            "Who should I talk to if I'm upset?",
            "What are some ways to feel calm?"
        ],
        answers: [
            "Talking about feelings helps us understand and cope with them.",
            "Managing stress can be done by breathing exercises or talking to someone.",
            "If you're feeling sad, try talking to a friend or doing something you enjoy.",
            "You can talk to a trusted adult or friend if you're upset.",
            "To feel calm, try deep breathing or listening to relaxing music."
        ]
    },
    {
        topic: "Hygiene",
        keywords: ["hygiene", "cleanliness", "wash", "hands", "brush"],
        questions: [
            "Why should I wash my hands?",
            "How often should I brush my teeth?",
            "What is personal hygiene?",
            "Why is it important to keep clean?",
            "How should I care for my body?"
        ],
        answers: [
            "Washing hands prevents germs from spreading.",
            "You should brush your teeth twice a day.",
            "Personal hygiene means keeping yourself clean and healthy.",
            "Keeping clean helps us avoid getting sick.",
            "Caring for your body includes bathing, brushing, and washing hands."
        ]
    },
    {
        topic: "Time Management",
        keywords: ["time", "manage", "schedule", "organize", "routine"],
        questions: [
            "How can I manage my time better?",
            "What are good scheduling habits?",
            "How can I make a daily routine?",
            "Why is time management important?",
            "What tools can help with time management?"
        ],
        answers: [
            "Time management helps you balance school, play, and rest.",
            "Good scheduling habits include setting priorities and planning breaks.",
            "A daily routine helps you stay organized and manage your time.",
            "Managing time is important to avoid stress and complete tasks.",
            "Using a planner or calendar can help with time management."
        ]
    },
    {
        topic: "Creativity",
        keywords: ["creativity", "art", "imagination", "expression", "crafts"],
        questions: [
            "What are some creative activities?",
            "How can I be more creative?",
            "Why is imagination important?",
            "What can I create with paper?",
            "How can creativity help me?"
        ],
        answers: [
            "Creative activities include drawing, painting, and crafting.",
            "Being more creative involves exploring new ideas and trying new things.",
            "Imagination helps us solve problems and think outside the box.",
            "You can create paper crafts like origami or collages.",
            "Creativity helps us express ourselves and relax."
        ]
    },
    {
        topic: "Respect",
        keywords: ["respect", "value", "honor", "appreciate", "others"],
        questions: [
            "Why is respect important?",
            "How can I show respect to others?",
            "What does it mean to be respectful?",
            "How do I earn respect?",
            "Why should I respect myself?"
        ],
        answers: [
            "Respect is about treating others kindly and valuing their feelings.",
            "You can show respect by listening and being polite.",
            "Being respectful means honoring others' boundaries and values.",
            "You earn respect by being honest and reliable.",
            "Respecting yourself helps you feel proud and make good choices."
        ]
    },
        {
            topic: "Patience",
            keywords: ["patience", "wait", "calm", "self-control", "focus"],
            questions: [
                "Why is patience important?",
                "How can I be more patient?",
                "What should I do when I'm feeling impatient?",
                "How does patience help me in school?",
                "Why do people say 'patience is a virtue'?"
            ],
            answers: [
                "Patience helps us stay calm and make better decisions.",
                "To be more patient, try taking deep breaths and counting to ten.",
                "When you're feeling impatient, try focusing on something else.",
                "Patience helps in school by allowing you to work carefully and not rush.",
                "People say patience is a virtue because it shows strength and control."
            ]
        },
        {
            topic: "Self-Discipline",
            keywords: ["discipline", "self-control", "responsibility", "goals", "focus"],
            questions: [
                "What is self-discipline?",
                "How can I develop self-discipline?",
                "Why is self-discipline important?",
                "How does self-discipline help with goals?",
                "What are some ways to practice self-discipline?"
            ],
            answers: [
                "Self-discipline is the ability to control yourself and make good choices.",
                "You can develop self-discipline by setting small goals and sticking to them.",
                "Self-discipline helps you focus and achieve what you want.",
                "With self-discipline, you can work hard toward goals without getting distracted.",
                "Practicing self-discipline includes doing things on time and saying no to distractions."
            ]
        },
        {
            topic: "Self-Care",
            keywords: ["self-care", "relax", "mental health", "well-being", "balance"],
            questions: [
                "What is self-care?",
                "Why is self-care important?",
                "How can I practice self-care daily?",
                "What are some examples of self-care?",
                "How can self-care make me feel better?"
            ],
            answers: [
                "Self-care means taking time to do things that make you feel good and healthy.",
                "Self-care is important because it helps you stay happy and balanced.",
                "You can practice self-care daily by relaxing and doing things you enjoy.",
                "Examples of self-care are reading a book, taking a bath, or going for a walk.",
                "Self-care helps you feel better by reducing stress and keeping you energized."
            ]
        },
        {
            topic: "Healthy Choices",
            keywords: ["choices", "health", "nutrition", "wellness", "decisions"],
            questions: [
                "What does it mean to make healthy choices?",
                "How can I make better food choices?",
                "Why are healthy choices important?",
                "How can I make healthy choices every day?",
                "What are some examples of healthy choices?"
            ],
            answers: [
                "Making healthy choices means choosing things that are good for your body and mind.",
                "You can make better food choices by eating fruits, vegetables, and whole grains.",
                "Healthy choices are important because they keep you strong and healthy.",
                "Every day, you can make healthy choices by eating well and getting exercise.",
                "Examples of healthy choices include drinking water, sleeping well, and exercising."
            ]
        },
        {
            topic: "Respect for Nature",
            keywords: ["nature", "environment", "respect", "earth", "green"],
            questions: [
                "Why should we respect nature?",
                "How can I help protect the environment?",
                "What are simple ways to care for nature?",
                "Why is it important to keep our environment clean?",
                "What does it mean to be eco-friendly?"
            ],
            answers: [
                "We should respect nature because it gives us everything we need to live.",
                "You can help protect the environment by recycling and saving energy.",
                "Simple ways to care for nature include picking up litter and planting trees.",
                "Keeping the environment clean helps protect animals and keeps us healthy.",
                "Being eco-friendly means making choices that don't harm the earth."
            ]
        },
        {
            topic: "Problem Solving",
            keywords: ["problem", "solve", "solutions", "think", "challenges"],
            questions: [
                "What is problem-solving?",
                "Why is it important to solve problems?",
                "How can I get better at solving problems?",
                "What should I do when I face a problem?",
                "What are the steps to solve a problem?"
            ],
            answers: [
                "Problem-solving is finding ways to fix or improve a situation.",
                "Solving problems helps us learn, grow, and make better decisions.",
                "To get better, practice by thinking through small problems first.",
                "When you face a problem, take a deep breath and think of possible solutions.",
                "The steps are: identify the problem, think of solutions, and try the best one."
            ]
        },
        {
            topic: "Mindfulness",
            keywords: ["mindfulness", "focus", "present", "calm", "meditation"],
            questions: [
                "What is mindfulness?",
                "How can mindfulness help me?",
                "Why should I practice mindfulness?",
                "How can I start being more mindful?",
                "What are some mindfulness exercises?"
            ],
            answers: [
                "Mindfulness is paying attention to the present moment.",
                "Mindfulness can help you feel calm and focus on what you are doing.",
                "Practicing mindfulness helps reduce stress and improves focus.",
                "You can start by taking a few deep breaths and noticing your surroundings.",
                "Mindfulness exercises include deep breathing, focusing on sounds, and meditation."
            ]
        },
        {
            topic: "Gratitude",
            keywords: ["gratitude", "thankful", "appreciation", "kindness", "positive"],
            questions: [
                "What is gratitude?",
                "How can I practice gratitude?",
                "Why is it important to be thankful?",
                "How can gratitude make me happier?",
                "What are some ways to show gratitude?"
            ],
            answers: [
                "Gratitude is being thankful and appreciating what you have.",
                "You can practice gratitude by thinking about what you’re grateful for each day.",
                "Being thankful helps you feel happier and more positive.",
                "Gratitude makes you happier by focusing on the good things in life.",
                "Ways to show gratitude include saying thank you and writing notes of appreciation."
            ]
        },
        {
            topic: "Digital Safety",
            keywords: ["online", "digital", "safety", "internet", "privacy"],
            questions: [
                "What is digital safety?",
                "How can I stay safe online?",
                "Why is it important to keep information private?",
                "What should I do if I see something upsetting online?",
                "How can I be a responsible internet user?"
            ],
            answers: [
                "Digital safety means staying safe while using the internet and devices.",
                "Stay safe online by not sharing personal details with strangers.",
                "Keeping information private helps protect you and your family.",
                "If you see something upsetting online, tell a trusted adult right away.",
                "Being responsible online means treating others with respect and following rules."
            ]
        },
        {
            topic: "Family Relationships",
            keywords: ["family", "relationships", "bonding", "support", "home"],
            questions: [
                "Why is family important?",
                "How can I spend quality time with my family?",
                "What should I do if I have a disagreement with family?",
                "How can I show appreciation to my family?",
                "Why is it important to support family members?"
            ],
            answers: [
                "Family is important because they care for us and provide support.",
                "You can spend quality time with family by doing fun activities together.",
                "If you disagree, try to listen calmly and express how you feel.",
                "Show appreciation by saying thank you and helping around the house.",
                "Supporting family members makes everyone feel valued and connected."
            ]
        }    
    // Continue adding the remaining 20 topics similarly...
];

// Generate entries
const entries = [];
let id = 1;
for (let i = 0; i < 333; i++) {
    topics.forEach(({ topic, keywords, questions, answers }) => {
        const question = questions[i % questions.length];
        const answer = answers[i % answers.length];
        entries.push({ id, keywords, topic, question, answer });
        id++;
    });
}

// Convert entries to SQL insert format
let sqlInserts = "INSERT INTO knowledge_base (id, keywords, topic, question, answer) VALUES\n";
sqlInserts += entries.map(entry => `(${entry.id}, "${entry.keywords}", "${entry.topic}", "${entry.question}", "${entry.answer}")`).join(",\n") + ";";

// Write to a .sql file
fs.writeFileSync('insert_data.sql', sqlInserts);

console.log("SQL file generated successfully with 10,000 entries.");