import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCw, CheckCircle, XCircle } from 'lucide-react';

interface Card {
    front: string;
    back: string;
}

interface FlashcardGameProps {
    content: string; // JSON string with { cards: Card[] }
    onComplete: (score: number) => void;
}

export const FlashcardGame: React.FC<FlashcardGameProps> = ({ content, onComplete }) => {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [knownCount, setKnownCount] = useState(0);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        try {
            const data = JSON.parse(content);
            if (data.cards) {
                setCards(data.cards);
            }
        } catch (e) {
            console.error("Invalid game content", e);
        }
    }, [content]);

    const handleNext = (known: boolean) => {
        if (known) setKnownCount(prev => prev + 1);
        setIsFlipped(false);

        if (currentIndex < cards.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
        } else {
            setShowResult(true);
            const finalScore = Math.round(((knownCount + (known ? 1 : 0)) / cards.length) * 100);
            onComplete(finalScore);
        }
    };

    if (cards.length === 0) return <div>Carregando...</div>;

    if (showResult) {
        return (
            <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-indigo-600 mb-4">Sessão Concluída!</h2>
                <p className="text-xl text-slate-600 mb-8">
                    Você memorizou {knownCount} de {cards.length} cartões.
                </p>
                <div className="w-full bg-slate-200 rounded-full h-4 mb-8 max-w-md mx-auto">
                    <div
                        className="bg-indigo-600 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${(knownCount / cards.length) * 100}%` }}
                    />
                </div>
                <button
                    onClick={() => window.location.reload()}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
                    Jogar Novamente
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="mb-6 text-slate-500 font-medium">
                Cartão {currentIndex + 1} de {cards.length}
            </div>

            <div
                className="relative w-full max-w-lg h-64 cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <motion.div
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front */}
                    <div className="absolute w-full h-full backface-hidden bg-white border-2 border-indigo-100 rounded-2xl shadow-xl flex items-center justify-center p-8 text-center">
                        <h3 className="text-2xl font-bold text-slate-800">{cards[currentIndex].front}</h3>
                        <div className="absolute bottom-4 text-slate-400 text-sm flex items-center">
                            <RotateCw className="w-4 h-4 mr-1" /> Clique para virar
                        </div>
                    </div>

                    {/* Back */}
                    <div
                        className="absolute w-full h-full backface-hidden bg-indigo-50 border-2 border-indigo-200 rounded-2xl shadow-xl flex items-center justify-center p-8 text-center"
                        style={{ transform: 'rotateY(180deg)' }}
                    >
                        <p className="text-lg text-slate-700">{cards[currentIndex].back}</p>
                    </div>
                </motion.div>
            </div>

            <div className="mt-12 flex space-x-6">
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(false); }}
                    className="flex items-center px-6 py-3 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
                >
                    <XCircle className="w-5 h-5 mr-2" />
                    Estudar Mais
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(true); }}
                    className="flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition"
                >
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Já Sei!
                </button>
            </div>
        </div>
    );
};
