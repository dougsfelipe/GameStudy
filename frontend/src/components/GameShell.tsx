import React from 'react';
import { ArrowLeft, Trophy } from 'lucide-react';


interface GameShellProps {
    title: string;
    score: number;
    total?: number;
    onBack: () => void;
    children: React.ReactNode;
}

export const GameShell: React.FC<GameShellProps> = ({ title, score, total, onBack, children }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button onClick={onBack} className="flex items-center text-slate-600 hover:text-indigo-600 transition">
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    Voltar
                </button>
                <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
                <div className="flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-bold">
                    <Trophy className="w-5 h-5 mr-2" />
                    <span>{score} {total ? `/ ${total}` : 'pontos'}</span>
                </div>
            </div>
            <div className="bg-white rounded-xl shadow-xl p-6 min-h-[500px]">
                {children}
            </div>
        </div>
    );
};
