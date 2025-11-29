export interface Topic {
    id: string;
    name: string;
    subtopics: Subtopic[];
}

export interface Subtopic {
    id: string;
    name: string;
    subjects: Subject[];
}

export interface Subject {
    id: string;
    name: string;
    description: string;
    games: Game[];
}

export interface Game {
    id: string;
    type: 'flashcard' | 'matching' | 'dragdrop' | 'quiz';
    title: string;
    content: string; // JSON string
}

export interface UserProgress {
    subjectId: string;
    gameId?: string;
    score: number;
    completed: boolean;
}
