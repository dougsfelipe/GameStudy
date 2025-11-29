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
                    },
                    {
                        id: 'jakarta-ee-subject',
                        name: 'Anotações Jakarta EE',
                        description: 'Domine as anotações essenciais do Jakarta EE (CDI, JAX-RS, EJB)',
                        games: [
                            {
                                id: 'jakarta-matching',
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
                    },
                    {
                        id: 'jpa-hibernate-subject',
                        name: 'JPA e Hibernate',
                        description: 'Mapeamento Objeto-Relacional e Persistência',
                        games: [
                            {
                                id: 'jpa-matching',
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
                    },
                    {
                        id: 'spring-data-subject',
                        name: 'Spring Framework & Data',
                        description: 'Conceitos avançados de Spring e Acesso a Dados',
                        games: [
                            {
                                id: 'spring-data-flashcards',
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
                ]
            }
        ]
    }
];
