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
                create: [
                    {
                        name: 'Desenvolvimento',
                        subjects: {
                            create: [
                                {
                                    name: 'Anotações de Java Spring & Data',
                                    description: 'Aprenda as principais anotações do Spring Boot, Spring Core e Spring Data',
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
                                            },
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
                                    name: 'JPA/Hibernate',
                                    description: 'Mapeamento Objeto-Relacional, Persistência e Claims JWT',
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
                                            },
                                            {
                                                type: 'matching',
                                                title: 'Notation',
                                                content: JSON.stringify({
                                                    pairs: [
                                                        { term: '@Entity', definition: 'Objeto do banco de dados (Database object)' },
                                                        { term: '@Id', definition: 'Chave primária (Primary key)' },
                                                        { term: '@GeneratedValue', definition: 'ID gerado automaticamente (Auto-generated ID)' },
                                                        { term: '@JoinColumn', definition: 'Chave estrangeira (Foreign key)' },
                                                        { term: '@ManyToOne', definition: 'Muitos filhos → Um pai' },
                                                        { term: '@OneToMany', definition: 'Um pai → Muitos filhos' },
                                                        { term: 'LAZY', definition: 'Carregamento sob demanda (Load on demand)' },
                                                        { term: 'EAGER', definition: 'Carregamento imediato (Load immediately)' },
                                                        { term: '@Table', definition: 'Mapeia a entidade para uma tabela específica' },
                                                        { term: '@Column', definition: 'Mapeia um campo para uma coluna do banco' },
                                                        { term: '@Transient', definition: 'Campo não é persistido no banco de dados' },
                                                        { term: '@Enumerated', definition: 'Armazena um enum como STRING ou ORDINAL' },
                                                        { term: '@Lob', definition: 'Armazena objetos grandes (BLOB/CLOB)' },
                                                        { term: '@Embedded', definition: 'Embute outro objeto dentro da entidade' },
                                                        { term: '@Embeddable', definition: 'Marca uma classe que pode ser embutida em uma entidade' }
                                                    ]
                                                })
                                            },
                                            {
                                                type: 'matching',
                                                title: 'JWT',
                                                content: JSON.stringify({
                                                    pairs: [
                                                        { term: 'iss', definition: 'Quem emitiu o token (Who issued it)' },
                                                        { term: 'sub', definition: 'Quem o token representa (Who it represents)' },
                                                        { term: 'aud', definition: 'Quem pode usar o token (Who can use it)' },
                                                        { term: 'exp', definition: 'Data/hora de expiração do token (Expiration)' },
                                                        { term: 'iat', definition: 'Data/hora de criação do token (Creation time)' },
                                                        { term: 'nbf', definition: 'Válido a partir de (Valid from)' },
                                                        { term: 'jti', definition: 'ID único do token (Unique token ID)' }
                                                    ]
                                                })
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    },
                    {
                        name: 'Web Developer',
                        subjects: {
                            create: [
                                {
                                    name: 'React',
                                    description: 'Biblioteca para interfaces de usuário (Hooks, Components, JSX)',
                                    games: {
                                        create: [
                                            {
                                                type: 'matching',
                                                title: 'React Essentials',
                                                content: JSON.stringify({
                                                    pairs: [
                                                        { term: 'useState', definition: 'Gerencia estado local em componentes funcionais.' },
                                                        { term: 'useEffect', definition: 'Executa efeitos colaterais (API, DOM).' },
                                                        { term: 'useContext', definition: 'Acessa contexto global sem prop drilling.' },
                                                        { term: 'JSX', definition: 'Sintaxe que mistura HTML com JavaScript.' },
                                                        { term: 'Props', definition: 'Dados passados de pai para filho (somente leitura).' },
                                                        { term: 'npm create vite@latest', definition: 'Comando para criar um projeto React moderno.' },
                                                        { term: 'virtual DOM', definition: 'Cópia leve do DOM para otimizar atualizações.' }
                                                    ]
                                                })
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: 'Angular',
                                    description: 'Framework robusto para aplicações web (CLI, Diretivas, Services)',
                                    games: {
                                        create: [
                                            {
                                                type: 'flashcard',
                                                title: 'Angular CLI & Concepts',
                                                content: JSON.stringify({
                                                    cards: [
                                                        { front: 'ng new', back: 'Cria um novo projeto Angular configurado.' },
                                                        { front: 'ng serve', back: 'Inicia o servidor de desenvolvimento local.' },
                                                        { front: 'ng generate component', back: 'Cria automaticamente os arquivos de um componente.' },
                                                        { front: '*ngIf', back: 'Diretiva estrutural para renderização condicional.' },
                                                        { front: '*ngFor', back: 'Diretiva estrutural para iterar sobre listas.' },
                                                        { front: '[(ngModel)]', back: 'Sintaxe para Two-Way Data Binding.' },
                                                        { front: '@Input()', back: 'Decorador para receber dados do componente pai.' }
                                                    ]
                                                })
                                            }
                                        ]
                                    }
                                },
                                {
                                    name: 'Node.js',
                                    description: 'Runtime JavaScript server-side (NPM, Modules, Express)',
                                    games: {
                                        create: [
                                            {
                                                type: 'matching',
                                                title: 'Node.js & NPM',
                                                content: JSON.stringify({
                                                    pairs: [
                                                        { term: 'npm init', definition: 'Inicializa um projeto criando o package.json.' },
                                                        { term: 'npm install', definition: 'Baixa e instala as dependências listadas.' },
                                                        { term: 'node index.js', definition: 'Executa o arquivo JavaScript no runtime.' },
                                                        { term: 'require()', definition: 'Função CommonJS para importar módulos.' },
                                                        { term: 'module.exports', definition: 'Objeto para exportar funcionalidades do módulo.' },
                                                        { term: 'fs', definition: 'Módulo nativo para manipulação de arquivos.' },
                                                        { term: 'http', definition: 'Módulo nativo para criar servidores HTTP.' },
                                                        { term: 'Express', definition: 'Framework web minimalista e flexível para Node.js.' }
                                                    ]
                                                })
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
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
