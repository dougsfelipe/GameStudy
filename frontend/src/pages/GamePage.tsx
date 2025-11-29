import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { GameShell } from '../components/GameShell';
import { MatchingGame } from '../components/MatchingGame';
import { FlashcardGame } from '../components/FlashcardGame';
import { Game } from '../types';

export const GamePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { topics, fetchTopics, saveProgress } = useStore();
    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGame = async () => {
            if (!id) return;

            // Ensure topics are loaded (will use mock if API fails)
            if (topics.length === 0) {
                await fetchTopics();
            }

            // Search for game in topics (store state)
            // Note: We need to access the latest state, so we might need to rely on the effect re-running or check store directly if needed.
            // But since fetchTopics awaits, the store should be updated. 
            // However, due to closure, 'topics' might be stale here if we don't depend on it.
            // Better to get state directly or depend on topics.

            const currentTopics = useStore.getState().topics;

            let foundGame: Game | undefined;
            let subjectId: string | undefined;

            for (const topic of currentTopics) {
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
            setLoading(false);
        };
        loadGame();
    }, [id, topics.length]); // Re-run if topics load

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
