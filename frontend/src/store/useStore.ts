import { create } from 'zustand';
import { Topic, Subject } from '../types';
import { api } from '../lib/api';
import { MOCK_TOPICS } from '../lib/mockData';

interface AppState {
    topics: Topic[];
    currentSubject: Subject | null;
    isLoading: boolean;
    fetchTopics: () => Promise<void>;
    fetchSubject: (id: string) => Promise<void>;
    saveProgress: (subjectId: string, gameId: string, score: number, completed: boolean) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
    topics: [],
    currentSubject: null,
    isLoading: false,
    fetchTopics: async () => {
        set({ isLoading: true });
        try {
            const { data } = await api.get('/topics');
            set({ topics: data });
        } catch (error) {
            console.warn('Failed to fetch topics, using mock data', error);
            set({ topics: MOCK_TOPICS });
        } finally {
            set({ isLoading: false });
        }
    },
    fetchSubject: async (id: string) => {
        set({ isLoading: true });
        try {
            // Try to find in existing topics first (mock or real)
            const state = useStore.getState();
            let foundSubject: Subject | undefined;

            for (const topic of state.topics) {
                for (const subtopic of topic.subtopics) {
                    const subject = subtopic.subjects.find(s => s.id === id);
                    if (subject) {
                        foundSubject = subject;
                        break;
                    }
                }
            }

            if (foundSubject) {
                set({ currentSubject: foundSubject });
            } else {
                // Fallback to API if not found (e.g. direct link)
                const { data } = await api.get(`/subjects/${id}`);
                set({ currentSubject: data });
            }
        } catch (error) {
            console.warn('Failed to fetch subject, checking mock data', error);
            // Fallback search in mock data if API fails
            let foundSubject: Subject | undefined;
            for (const topic of MOCK_TOPICS) {
                for (const subtopic of topic.subtopics) {
                    const subject = subtopic.subjects.find(s => s.id === id);
                    if (subject) {
                        foundSubject = subject;
                        break;
                    }
                }
            }
            if (foundSubject) {
                set({ currentSubject: foundSubject });
            }
        } finally {
            set({ isLoading: false });
        }
    },
    saveProgress: async (subjectId, gameId, score, completed) => {
        try {
            await api.post('/progress', { subjectId, gameId, score, completed });
        } catch (error) {
            console.warn('Failed to save progress (offline mode)', error);
        }
    },
}));
