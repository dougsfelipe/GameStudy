import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.userProgress.deleteMany({});
    await prisma.game.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.subtopic.deleteMany({});
    await prisma.topic.deleteMany({});

    // Create Topic
    const topic = await prisma.topic.create({
        data: {
            name: 'Tecnologia da Informação',
            subtopics: {
                create: {
                    name: 'Desenvolvimento',
                    subjects: {
                        create: {
                            name: 'Anotações de Java Spring',
                            description: 'Aprenda as principais anotações do Spring Boot',
                            games: {
                                create: [
                                    {
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
                        }
                    }
                }
            }
        }
    });

    console.log('Seed data created:', topic);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
