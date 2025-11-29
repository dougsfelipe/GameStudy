import { Topic } from '../types';

export const MOCK_TOPICS: Topic[] = [
    {
        id: 'c3de7e45-995e-4868-8865-ce1ddabc23d9',
        name: 'Tecnologia da Informação',
        subtopics: [
            {
                id: '8da270ca-c535-4ea0-924a-53eddc127f69',
                name: 'Desenvolvimento',
                subjects: [
                    {
                        id: '468ca9f2-5b2b-4047-a09c-27e33829cd7c',
                        name: 'Anotações de Java Spring',
                        description: 'Aprenda as principais anotações do Spring Boot',
                        games: [
                            {
                                id: 'd9109ca9-d293-407f-8273-2a830a44b95e',
                                type: 'matching',
                                title: 'Ligue as Anotações',
                                content: JSON.stringify({
                                    pairs: [
                                        { term: '@SpringBootApplication', definition: 'Inicia o aplicativo Spring Boot.' },
                                        { term: '@RestController', definition: 'Define um controlador REST.' },
                                        { term: '@RequestMapping', definition: 'Mapeia requisições web.' },
                                        { term: '@Component', definition: 'Componente genérico gerenciado pelo Spring.' },
                                        { term: '@Service', definition: 'Lógica de negócios.' },
                                        { term: '@Repository', definition: 'Acesso a dados.' },
                                        { term: '@Value', definition: 'Injeção de valores de configuração.' },
                                        { term: '@Autowired', definition: 'Injeção de dependência automática.' },
                                        { term: '@Configuration', definition: 'Classe de configuração.' }
                                    ]
                                })
                            },
                            {
                                id: 'f8201ca9-d293-407f-8273-2a830a44b95f',
                                type: 'flashcard',
                                title: 'Flashcards Spring',
                                content: JSON.stringify({
                                    cards: [
                                        { front: '@SpringBootApplication', back: 'Anotação que marca a classe principal de configuração.' },
                                        { front: '@Autowired', back: 'Injeta dependências automaticamente.' }
                                    ]
                                })
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
