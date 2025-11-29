import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Play, Star, ArrowLeft } from 'lucide-react';

export const SubjectPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { currentSubject, fetchSubject, isLoading } = useStore();

    useEffect(() => {
        if (id) fetchSubject(id);
    }, [id, fetchSubject]);

    if (isLoading || !currentSubject) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link to="/topics" className="inline-flex items-center text-slate-500 hover:text-indigo-600 mb-6 transition">
                <ArrowLeft className="w-4 h-4 mr-1" /> Voltar para Tópicos
            </Link>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                <div className="bg-indigo-600 px-8 py-10 text-white">
                    <h1 className="text-3xl font-bold mb-2">{currentSubject.name}</h1>
                    <p className="text-indigo-100 text-lg">{currentSubject.description}</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-6">Atividades Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentSubject.games.map((game) => (
                    <Link
                        key={game.id}
                        to={`/game/${game.id}`}
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${game.type === 'flashcard' ? 'bg-blue-100 text-blue-600' :
                                    game.type === 'matching' ? 'bg-purple-100 text-purple-600' :
                                        'bg-orange-100 text-orange-600'
                                }`}>
                                <Star className="w-6 h-6" />
                            </div>
                            <span className="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
                                {game.type === 'flashcard' ? 'Memória' : 'Prática'}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition">{game.title}</h3>
                        <p className="text-slate-500 mb-4 text-sm">
                            {game.type === 'flashcard' ? 'Revise conceitos com cartões de memória.' :
                                game.type === 'matching' ? 'Conecte os termos às suas definições corretas.' :
                                    'Teste seus conhecimentos.'}
                        </p>
                        <div className="flex items-center text-indigo-600 font-semibold text-sm">
                            <Play className="w-4 h-4 mr-1 fill-current" />
                            Jogar Agora
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};
