import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { TopicsPage } from './pages/TopicsPage';
import { SubjectPage } from './pages/SubjectPage';
import { GamePage } from './pages/GamePage';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="topics" element={<TopicsPage />} />
                <Route path="subject/:id" element={<SubjectPage />} />
                <Route path="game/:id" element={<GamePage />} />
            </Route>
        </Routes>
    );
}

export default App;
