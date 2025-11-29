import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Folder, ChevronRight, Book } from 'lucide-react';

export const TopicsPage: React.FC = () => {
    const { topics, fetchTopics, isLoading } = useStore();

    useEffect(() => {
        fetchTopics();
    }, [fetchTopics]);

    if (isLoading) {
        return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Tópicos de Estudo</h1>

            <div className="space-y-8">
                {topics.map((topic) => (
                    <div key={topic.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
                            <Folder className="w-6 h-6 text-indigo-600 mr-3" />
                            <h2 className="text-xl font-bold text-slate-800">{topic.name}</h2>
                        </div>
                        <div className="p-6">
                            {topic.subtopics.map((subtopic) => (
                                <div key={subtopic.id} className="mb-6 last:mb-0">
                                    <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">{subtopic.name}</h3>
                                    <div className="grid gap-3">
                                        {subtopic.subjects.map((subject) => (
                                            <Link
                                                key={subject.id}
                                                to={`/subject/${subject.id}`}
                                                className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:border-indigo-300 hover:bg-indigo-50 transition group"
                                            >
                                                <div className="flex items-center">
                                                    <Book className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 mr-3" />
                                                    <span className="font-medium text-slate-700 group-hover:text-indigo-900">{subject.name}</span>
                                                </div>
                                                <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
