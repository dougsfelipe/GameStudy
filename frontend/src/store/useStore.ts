import { create } from 'zustand';
import { Topic, Subject } from '../types';
import { api } from '../lib/api';

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
            console.error('Failed to fetch topics', error);
        } finally {
            set({ isLoading: false });
        }
    },
    fetchSubject: async (id: string) => {
        set({ isLoading: true });
        try {
            const { data } = await api.get(`/subjects/${id}`);
            set({ currentSubject: data });
        } catch (error) {
            console.error('Failed to fetch subject', error);
        } finally {
            set({ isLoading: false });
        }
    },
    saveProgress: async (subjectId, gameId, score, completed) => {
        try {
            await api.post('/progress', { subjectId, gameId, score, completed });
        } catch (error) {
            console.error('Failed to save progress', error);
        }
    },
}));
