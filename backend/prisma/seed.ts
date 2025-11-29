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
                        create: [
                            {
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
                            },
                            {
                                name: 'Anotações Jakarta EE',
                                description: 'Domine as anotações essenciais do Jakarta EE (CDI, JAX-RS, EJB)',
                                games: {
                                    create: [
                                        {
                                            type: 'matching',
                                            title: 'Jakarta EE Essentials',
                                            content: JSON.stringify({
                                                pairs: [
                                                    { term: '@Inject', definition: 'Solicita ao contêiner que forneça uma instância do bean.' },
                                                    { term: '@Named', definition: 'Torna o bean acessível pela Expression Language (EL).' },
                                                    { term: '@ApplicationScoped', definition: 'Uma única instância do bean para toda a aplicação.' },
                                                    { term: '@RequestScoped', definition: 'Bean existe apenas durante uma requisição HTTP.' },
                                                    { term: '@Path', definition: 'Define o caminho (URI) do recurso REST.' },
                                                    { term: '@GET', definition: 'Mapeia o método para o verbo HTTP GET.' },
                                                    { term: '@Produces', definition: 'Define o tipo de mídia que o método retorna.' },
                                                    { term: '@PostConstruct', definition: 'Executado logo após a injeção de dependências.' },
                                                    { term: '@Stateless', definition: 'Define um EJB de sessão sem estado.' },
                                                    { term: '@Resource', definition: 'Injeta recursos do contêiner (ex: DataSource).' }
                                                ]
                                            })
                                        }
                                    ]
                                }
                            },
                            {
                                name: 'JPA e Hibernate',
                                description: 'Mapeamento Objeto-Relacional e Persistência',
                                games: {
                                    create: [
                                        {
                                            type: 'matching',
                                            title: 'Mapeamento ORM',
                                            content: JSON.stringify({
                                                pairs: [
                                                    { term: '@Entity', definition: 'Marca a classe como uma entidade persistente.' },
                                                    { term: '@Id', definition: 'Marca o campo como a Chave Primária.' },
                                                    { term: '@GeneratedValue', definition: 'Especifica como a chave primária será gerada.' },
                                                    { term: '@Table', definition: 'Especifica o nome da tabela no banco de dados.' },
                                                    { term: '@Column', definition: 'Especifica detalhes da coluna (nome, tamanho, etc).' },
                                                    { term: '@OneToMany', definition: 'Define relacionamento Um para Muitos.' },
                                                    { term: '@PersistenceContext', definition: 'Injeta uma instância do EntityManager.' },
                                                    { term: '@Cacheable', definition: 'Habilita o cache de segundo nível (Hibernate).' }
                                                ]
                                            })
                                        }
                                    ]
                                }
                            },
                            {
                                name: 'Spring Framework & Data',
                                description: 'Conceitos avançados de Spring e Acesso a Dados',
                                games: {
                                    create: [
                                        {
                                            type: 'flashcard',
                                            title: 'Spring Core & Data',
                                            content: JSON.stringify({
                                                cards: [
                                                    { front: '@SpringBootApplication', back: 'Combina @Configuration, @EnableAutoConfiguration e @ComponentScan.' },
                                                    { front: '@Service', back: 'Especialização de @Component para lógica de negócio.' },
                                                    { front: '@Repository', back: 'Especialização de @Component para acesso a dados e exception translation.' },
                                                    { front: '@Query', back: 'Permite consultas JPQL ou SQL nativo customizadas.' },
                                                    { front: '@Transactional', back: 'Define os limites de uma transação (tudo ou nada).' },
                                                    { front: '@Modifying', back: 'Indica que a consulta modificará dados (INSERT, UPDATE, DELETE).' }
                                                ]
                                            })
                                        }
                                    ]
                                }
                            }
                        ]
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
