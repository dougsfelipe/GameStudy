import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { GameShell } from '../components/GameShell';
import { MatchingGame } from '../components/MatchingGame';
import { FlashcardGame } from '../components/FlashcardGame';
import { api } from '../lib/api';
import { Game } from '../types';

export const GamePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { saveProgress } = useStore();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGame = async () => {
            if (!id) return;
            try {
                // We need to fetch the game details directly since we might not have the subject loaded
                // Ideally we would have a getGame endpoint, but we can find it via subject for now or assume we have it
                // For simplicity, let's fetch the subject if we can, or just iterate topics.
                // Actually, let's add a specific endpoint for game or just fetch all topics and find it (inefficient but works for small app)
                // Better: Let's assume the backend has a way to get game by ID or we just fetch the subject it belongs to.
                // Since I didn't make a specific /games/:id endpoint, I'll fetch the subject first if I know it, but I don't know the subject ID here easily without query param.
                // Let's just add a quick endpoint to the backend or fetch all topics.
                // WAIT: I can just use the store if it's populated, but on refresh it won't be.
                // I'll add a simple fetch to get all topics and find the game for now to avoid backend changes if possible, 
                // OR I can just add the endpoint to backend quickly.
                // Let's try to fetch topics and search.
                const { data } = await api.get('/topics');
                let foundGame: Game | undefined;
                let subjectId: string | undefined;

                for (const topic of data) {
                    for (const subtopic of topic.subtopics) {
                        for (const subject of subtopic.subjects) {
                            const g = subject.games.find((g: Game) => g.id === id);
                            if (g) {
                                foundGame = g;
                                subjectId = subject.id;
                                break;
                            }
                        }
                    }
                }

                if (foundGame) {
                    setGame({ ...foundGame, subjectId } as any);
                }
            } catch (e) {
                console.error("Failed to load game", e);
            } finally {
                setLoading(false);
            }
        };
        fetchGame();
    }, [id]);

    const handleComplete = async (score: number) => {
        if (game && (game as any).subjectId) {
            await saveProgress((game as any).subjectId, game.id, score, true);
            // Maybe show a success modal or redirect back to subject
            // For now, let's just go back to subject after a delay or let the user choose in the game component
            // The game component handles the "Success" view, so we just save here.
        }
    };

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    if (!game) return <div className="text-center py-20">Jogo não encontrado</div>;

    return (
        <GameShell
            title={game.title}
            score={0}
            onBack={() => navigate(-1)}
        >
            {game.type === 'matching' && (
                <MatchingGame content={game.content} onComplete={handleComplete} />
            )}
            {game.type === 'flashcard' && (
                <FlashcardGame content={game.content} onComplete={handleComplete} />
            )}
        </GameShell>
    );
};
