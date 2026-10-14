/**
 * O SEU COLÉGIO - Central Data Store & State Management
 * Dados dinâmicos sincronizados entre o Site Público, Painel Admin e Portal do Aluno
 */

const STORAGE_KEYS = {
    NEWS: 'seu_colegio_news_v1',
    ENROLLMENTS: 'seu_colegio_enrollments_v1',
    EVENTS: 'seu_colegio_events_v1',
    SETTINGS: 'seu_colegio_settings_v1'
};

// Dados padrão iniciais (Fictícios porém contextuais e impecáveis do Colégio Dom Hélder)
const DEFAULT_NEWS = [
    {
        id: 'noticia-1',
        title: 'CDH é Vice-Campeão da Fase Regional dos Jogos Escolares 2026',
        category: 'Esportes',
        categoryColor: 'bg-emerald-500',
        date: '10 Out, 2026',
        author: 'Coord. Esportiva',
        image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80',
        summary: 'Nossos atletas de basquete, natação e atletismo brilharam e garantiram vaga para a grande fase estadual do JEPS.',
        content: 'É com imenso orgulho que celebramos os resultados históricos dos estudantes do Colégio Dom Hélder na fase regional dos Jogos Escolares. O esforço e a dedicação de nossos atletas e treinadores representam o compromisso de nossa instituição com a formação integral, unindo saúde, espírito de equipe e disciplina.',
        views: 342
    },
    {
        id: 'noticia-2',
        title: 'Mostra de Robótica Sustentável e Inovação Maker encanta famílias',
        category: 'Tecnologia & Robótica',
        categoryColor: 'bg-indigo-600',
        date: '05 Out, 2026',
        author: 'Prof. Marcos Silva',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        summary: 'Alunos do 1º ao 9º ano apresentaram protótipos automatizados que unem inteligência artificial, reciclagem e energia limpa.',
        content: 'Durante a Mostra Maker deste semestre, os estudantes demonstraram na prática os aprendizados em robótica educacional e sustentabilidade. Foram mais de 30 projetos apresentados, incluindo sistemas de irrigação automatizada e sensores inteligentes para coleta seletiva na escola.',
        views: 521
    },
    {
        id: 'noticia-3',
        title: 'Projeto Pequenos Leitores: Fortalecendo o amor pelos livros na Educação Infantil',
        category: 'Educação Infantil',
        categoryColor: 'bg-amber-500',
        date: '28 Set, 2026',
        author: 'Tia Juliana Pires',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
        summary: 'Atividades lúdicas, contação de histórias e momentos de encantamento despertam a curiosidade das nossas crianças de 2 a 5 anos.',
        content: 'A leitura é uma ponte para a imaginação e para o desenvolvimento da linguagem nos primeiros anos de vida. Na Educação Infantil do CDH, o projeto de contação de histórias envolve momentos de integração com os pais e experiências sensoriais que tornam o aprendizado inesquecível.',
        views: 418
    },
    {
        id: 'noticia-4',
        title: 'Parceria Urânia Planetária traz o Cosmos para o pátio do Colégio',
        category: 'Ciências & Astronomia',
        categoryColor: 'bg-sky-600',
        date: '15 Set, 2026',
        author: 'Coord. Pedagógica',
        image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
        summary: 'Imersão no planetário móvel estimulou a curiosidade científica em preparação para as provas da OBA e MOBFOG.',
        content: 'Estudantes do Ensino Fundamental mergulharam numa viagem espacial com projeção astronômica em 360 graus. O evento faz parte da preparação tradicional dos nossos alunos para as olimpíadas nacionais de ciências e astronomia.',
        views: 689
    }
];

const DEFAULT_EVENTS = [
    {
        id: 'ev-1',
        day: '24',
        month: 'OUT',
        title: 'Festival da Família e Apresentação Cultural 2026',
        time: '08:30 - 12:30',
        location: 'Auditório Principal e Quadra CDH',
        category: 'Evento Cultural'
    },
    {
        id: 'ev-2',
        day: '04',
        month: 'NOV',
        title: 'Início dos Simulados Bimestrais e Olimpíada de Matemática',
        time: '07:30 - 11:30',
        location: 'Salas do Fundamental II',
        category: 'Acadêmico'
    },
    {
        id: 'ev-3',
        day: '18',
        month: 'NOV',
        title: 'Apresentação Final dos Projetos de Empreendedorismo',
        time: '14:00 - 17:30',
        location: 'Espaço Conectar & Biblioteca',
        category: 'Projetos'
    }
];

const DEFAULT_ENROLLMENTS = [
    {
        id: 'MAT-2026-089',
        studentName: 'Gabriel Siqueira Rocha',
        grade: '1º Ano - Fundamental I',
        shift: 'Manhã',
        guardianName: 'Mariana Siqueira Rocha',
        cpf: '084.***.***-21',
        whatsapp: '(87) 99812-4411',
        email: 'mariana.siqueira@email.com',
        amount: 350.00,
        paymentMethod: 'PIX (Asaas)',
        status: 'PAGO',
        date: '14/10/2026 às 16:42',
        asaasId: 'pay_982341908234'
    },
    {
        id: 'MAT-2026-088',
        studentName: 'Beatriz Almeida Costa',
        grade: 'Maternal II (3 anos) - Infantil',
        shift: 'Tarde',
        guardianName: 'Roberto Costa Filho',
        cpf: '042.***.***-89',
        whatsapp: '(87) 99654-2200',
        email: 'roberto.costa@email.com',
        amount: 350.00,
        paymentMethod: 'Cartão de Crédito 3x (Asaas)',
        status: 'PAGO',
        date: '13/10/2026 às 19:15',
        asaasId: 'pay_771239841290'
    },
    {
        id: 'MAT-2026-087',
        studentName: 'Lucas Emmanuel Calado',
        grade: '6º Ano - Fundamental II',
        shift: 'Manhã',
        guardianName: 'Carlos Eduardo Calado',
        cpf: '078.***.***-55',
        whatsapp: '(87) 99933-8877',
        email: 'carlos.calado@email.com',
        amount: 350.00,
        paymentMethod: 'PIX (Asaas)',
        status: 'PAGO',
        date: '12/10/2026 às 11:20',
        asaasId: 'pay_120938471928'
    }
];

// Helper Functions
const SchoolStore = {
    getNews() {
        const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(DEFAULT_NEWS));
            return DEFAULT_NEWS;
        }
        return JSON.parse(stored);
    },

    addNews(newsItem) {
        const list = this.getNews();
        const newItem = {
            id: 'noticia-' + Date.now(),
            date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
            views: 1,
            ...newsItem
        };
        list.unshift(newItem);
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
        return newItem;
    },

    deleteNews(id) {
        const list = this.getNews().filter(item => item.id !== id);
        localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
        return list;
    },

    getEvents() {
        const stored = localStorage.getItem(STORAGE_KEYS.EVENTS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEFAULT_EVENTS));
            return DEFAULT_EVENTS;
        }
        return JSON.parse(stored);
    },

    getEnrollments() {
        const stored = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
        if (!stored) {
            localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(DEFAULT_ENROLLMENTS));
            return DEFAULT_ENROLLMENTS;
        }
        return JSON.parse(stored);
    },

    addEnrollment(enrollmentData) {
        const list = this.getEnrollments();
        const newEnrollment = {
            id: 'MAT-2026-' + String(list.length + 90).padStart(3, '0'),
            date: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
            status: 'PAGO',
            asaasId: 'pay_' + Math.floor(100000000000 + Math.random() * 900000000000),
            ...enrollmentData
        };
        list.unshift(newEnrollment);
        localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(list));
        return newEnrollment;
    }
};

window.SchoolStore = SchoolStore;
