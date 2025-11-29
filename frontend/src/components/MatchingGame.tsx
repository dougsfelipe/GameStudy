import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { clsx } from 'clsx';

interface Pair {
    term: string;
    definition: string;
}

interface MatchingGameProps {
    content: string; // JSON string with { pairs: Pair[] }
    onComplete: (score: number) => void;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({ content, onComplete }) => {
    const [pairs, setPairs] = useState<Pair[]>([]);
    const [shuffledTerms, setShuffledTerms] = useState<string[]>([]);
    const [shuffledDefs, setShuffledDefs] = useState<string[]>([]);
    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
    const [selectedDef, setSelectedDef] = useState<string | null>(null);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // Stores matched terms
    const [wrongPair, setWrongPair] = useState<boolean>(false);

    useEffect(() => {
        try {
            const data = JSON.parse(content);
            if (data.pairs) {
                setPairs(data.pairs);
                setShuffledTerms([...data.pairs.map((p: Pair) => p.term)].sort(() => Math.random() - 0.5));
                setShuffledDefs([...data.pairs.map((p: Pair) => p.definition)].sort(() => Math.random() - 0.5));
            }
        } catch (e) {
            console.error("Invalid game content", e);
        }
    }, [content]);

    useEffect(() => {
        if (selectedTerm && selectedDef) {
            const pair = pairs.find(p => p.term === selectedTerm);
            if (pair && pair.definition === selectedDef) {
                // Match found
                setMatchedPairs(prev => [...prev, selectedTerm]);
                setSelectedTerm(null);
                setSelectedDef(null);
            } else {
                // Wrong match
                setWrongPair(true);
                setTimeout(() => {
                    setSelectedTerm(null);
                    setSelectedDef(null);
                    setWrongPair(false);
                }, 1000);
            }
        }
    }, [selectedTerm, selectedDef, pairs]);

    useEffect(() => {
        if (pairs.length > 0 && matchedPairs.length === pairs.length) {
            onComplete(100); // Simple scoring for now
        }
    }, [matchedPairs, pairs, onComplete]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-indigo-600">Termos</h3>
                {shuffledTerms.map((term) => {
                    const isMatched = matchedPairs.includes(term);
                    const isSelected = selectedTerm === term;
                    const isWrong = isSelected && wrongPair;

                    return (
                        <button
                            key={term}
                            disabled={isMatched}
                            onClick={() => !isMatched && !wrongPair && setSelectedTerm(term)}
                            className={clsx(
                                "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left",
                                isMatched ? "bg-green-100 border-green-500 text-green-800 opacity-50" :
                                    isWrong ? "bg-red-100 border-red-500 text-red-800 animate-shake" :
                                        isSelected ? "bg-indigo-100 border-indigo-500 text-indigo-800 shadow-md scale-105" :
                                            "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                <span>{term}</span>
                                {isMatched && <Check className="w-5 h-5 text-green-600" />}
                                {isWrong && <X className="w-5 h-5 text-red-600" />}
                            </div>
                        </button>
                    );
                })}
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-indigo-600">Definições</h3>
                {shuffledDefs.map((def) => {
                    // Find the term for this definition to check if matched
                    const termForDef = pairs.find(p => p.definition === def)?.term;
                    const isMatched = termForDef ? matchedPairs.includes(termForDef) : false;
                    const isSelected = selectedDef === def;
                    const isWrong = isSelected && wrongPair;

                    return (
                        <button
                            key={def}
                            disabled={isMatched}
                            onClick={() => !isMatched && !wrongPair && setSelectedDef(def)}
                            className={clsx(
                                "w-full p-4 rounded-lg border-2 transition-all duration-200 text-left text-sm",
                                isMatched ? "bg-green-100 border-green-500 text-green-800 opacity-50" :
                                    isWrong ? "bg-red-100 border-red-500 text-red-800 animate-shake" :
                                        isSelected ? "bg-indigo-100 border-indigo-500 text-indigo-800 shadow-md scale-105" :
                                            "bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                <span>{def}</span>
                                {isMatched && <Check className="w-5 h-5 text-green-600" />}
                                {isWrong && <X className="w-5 h-5 text-red-600" />}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
