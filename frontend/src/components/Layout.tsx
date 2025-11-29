import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BookOpen, Home } from 'lucide-react';

export const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            <header className="bg-indigo-600 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                        <BookOpen className="w-8 h-8" />
                        <span>Memorização Pro</span>
                    </Link>
                    <nav className="flex space-x-4">
                        <Link to="/" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                            <Home className="w-5 h-5" />
                            <span>Início</span>
                        </Link>
                        <Link to="/topics" className="flex items-center space-x-1 hover:text-indigo-200 transition">
                            <BookOpen className="w-5 h-5" />
                            <span>Tópicos</span>
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8">
                <Outlet />
            </main>
            <footer className="bg-slate-800 text-slate-400 py-6 mt-auto">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2024 Sistema de Aprendizado e Memorização. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    );
};
