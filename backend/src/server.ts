import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Get all topics with hierarchy
app.get('/api/topics', async (req, res) => {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                subtopics: {
                    include: {
                        subjects: {
                            include: {
                                games: true
                            }
                        }
                    }
                }
            }
        });
        res.json(topics);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch topics' });
    }
});

// Get subject details with games
app.get('/api/subjects/:id', async (req, res) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id: req.params.id },
            include: {
                games: true
            }
        });
        if (!subject) return res.status(404).json({ error: 'Subject not found' });
        res.json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subject' });
    }
});

// Save progress
app.post('/api/progress', async (req, res) => {
    const { subjectId, gameId, score, completed } = req.body;
    try {
        const progress = await prisma.userProgress.create({
            data: {
                subjectId,
                gameId,
                score,
                completed
            }
        });
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save progress' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
