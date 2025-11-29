import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-12">
            <div className="text-center space-y-6 max-w-2xl">
                <div className="flex justify-center">
                    <div className="bg-indigo-100 p-6 rounded-full">
                        <Brain className="w-16 h-16 text-indigo-600" />
                    </div>
                </div>
                <h1 className="text-5xl font-bold text-slate-900 tracking-tight">
                    Domine o Conhecimento
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                    Uma plataforma gamificada para você aprender e memorizar conteúdos complexos de forma divertida e eficiente.
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Link
                        to="/topics"
                        className="flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Começar Agora
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Flashcards</h3>
                    <p className="text-slate-600">Repetição espaçada para fixar conceitos na memória de longo prazo.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Jogos de Conexão</h3>
                    <p className="text-slate-600">Associe termos e definições para entender relacionamentos complexos.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">Quiz Interativo</h3>
                    <p className="text-slate-600">Teste seus conhecimentos com desafios rápidos e feedback imediato.</p>
                </div>
            </div>
        </div>
    );
};
