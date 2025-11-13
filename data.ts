import { Category, DoctrineEntry } from './types';

export const doctrineData: DoctrineEntry[] = [
  // --- PART 1: CREDO ---
  {
    id: '1',
    category: Category.CREDO,
    title: 'O fim da existência do homem',
    content: 'Deus nos fez para mostrar a sua bondade e para participarmos da sua eterna felicidade no céu. Devemos conhecer, amar e servir a Deus nesta vida.',
    tags: ['existência', 'fim', 'propósito', 'felicidade', 'céu'],
    pageRef: '9-11'
  },
  {
    id: '2',
    category: Category.CREDO,
    title: 'Quem é Deus?',
    content: 'Deus é Aquele que é. É um Espírito infinitamente perfeito, eterno, onipotente, onipresente e onisciente. Há um só Deus.',
    tags: ['deus', 'natureza', 'espírito', 'perfeição'],
    pageRef: '25'
  },
  {
    id: '3',
    category: Category.CREDO,
    title: 'A Santíssima Trindade',
    content: 'Havendo um só Deus, existem nEle três Pessoas divinas: Pai, Filho e Espírito Santo. Há uma só natureza divina, mas três Pessoas.',
    tags: ['trindade', 'pai', 'filho', 'espírito santo', 'mistério'],
    pageRef: '32'
  },
  {
    id: '4',
    category: Category.CREDO,
    title: 'A Criação e os Anjos',
    content: 'Deus criou o universo do nada para sua glória. Criou os anjos, espíritos puros com inteligência e vontade. Alguns anjos pecaram e tornaram-se demônios.',
    tags: ['criação', 'anjos', 'demônios', 'diabo'],
    pageRef: '38'
  },
  {
    id: '5',
    category: Category.CREDO,
    title: 'Criação e Queda do Homem',
    content: 'O homem é composto de corpo e alma. Deus criou nossos primeiros pais, Adão e Eva, em estado de graça e justiça original. Pelo pecado de desobediência, perderam a graça para si e para nós (pecado original).',
    tags: ['homem', 'adão', 'eva', 'pecado original', 'queda'],
    pageRef: '50'
  },
  {
    id: '6',
    category: Category.CREDO,
    title: 'Jesus Cristo',
    content: 'Jesus Cristo é a Segunda Pessoa da Santíssima Trindade que se fez homem para nos salvar. É verdadeiro Deus e verdadeiro homem. Nasceu da Virgem Maria.',
    tags: ['jesus', 'cristo', 'encarnação', 'redentor', 'salvador'],
    pageRef: '88'
  },
  {
    id: '7',
    category: Category.CREDO,
    title: 'A Virgem Maria',
    content: 'A Virgem Maria é a Mãe de Deus (Theotokos). Foi concebida sem pecado original (Imaculada Conceição) e permaneceu sempre virgem.',
    tags: ['maria', 'mãe de deus', 'virgem', 'imaculada'],
    pageRef: '82'
  },
  {
    id: '8',
    category: Category.CREDO,
    title: 'A Igreja Católica',
    content: 'A Igreja é o Corpo Místico de Cristo. É una, santa, católica e apostólica. Foi fundada por Cristo para continuar sua obra de salvação.',
    tags: ['igreja', 'católica', 'corpo místico', 'notas'],
    pageRef: '155'
  },

  // --- PART 2: MANDAMENTOS ---
  {
    id: '9',
    category: Category.MANDAMENTOS,
    title: 'O Primeiro Mandamento',
    content: 'Amar a Deus sobre todas as coisas. Proíbe a idolatria, superstição, sacrilégio e nos obriga a prestar culto a Deus com fé, esperança e caridade.',
    tags: ['primeiro mandamento', 'amor', 'adoração', 'fé'],
    pageRef: '222'
  },
  {
    id: '10',
    category: Category.MANDAMENTOS,
    title: 'O Segundo e Terceiro Mandamentos',
    content: 'O segundo manda respeitar o nome de Deus (não jurar falso ou em vão). O terceiro manda santificar os domingos e festas de guarda (ouvir Missa e descanso).',
    tags: ['nome de deus', 'domingo', 'missa', 'blasfêmia'],
    pageRef: '249'
  },
  {
    id: '11',
    category: Category.MANDAMENTOS,
    title: 'O Quarto e Quinto Mandamentos',
    content: 'Honrar pai e mãe (e legítimas autoridades). Não matar (respeito à vida, proibição do homicídio, suicídio, escândalo e ódio).',
    tags: ['pais', 'família', 'vida', 'homicídio', 'respeito'],
    pageRef: '267'
  },
  {
    id: '12',
    category: Category.MANDAMENTOS,
    title: 'Sexto e Nono Mandamentos',
    content: 'Referem-se à pureza e castidade. Proíbem atos e pensamentos impuros. O sexo é sagrado dentro do matrimônio e deve estar aberto à vida.',
    tags: ['castidade', 'pureza', 'sexo', 'adultério', 'matrimônio'],
    pageRef: '280'
  },
  {
    id: '13',
    category: Category.MANDAMENTOS,
    title: 'Sétimo e Décimo Mandamentos',
    content: 'Não furtar e não cobiçar as coisas alheias. Exigem justiça, respeito à propriedade privada e restituição do que foi roubado.',
    tags: ['roubo', 'justiça', 'propriedade', 'cobiça'],
    pageRef: '288'
  },
  {
    id: '14',
    category: Category.MANDAMENTOS,
    title: 'Oitavo Mandamento',
    content: 'Não levantar falso testemunho. Exige dizer a verdade e respeitar a fama do próximo. Proíbe a mentira, calúnia e detração.',
    tags: ['verdade', 'mentira', 'calúnia', 'fama'],
    pageRef: '295'
  },

  // --- PART 3: SACRAMENTOS ---
  {
    id: '15',
    category: Category.SACRAMENTOS_ORACAO,
    title: 'O que são os Sacramentos?',
    content: 'Sinais sensíveis e eficazes da graça, instituídos por Cristo para santificar nossas almas. São sete: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem e Matrimônio.',
    tags: ['sacramentos', 'graça', 'sinais'],
    pageRef: '312'
  },
  {
    id: '16',
    category: Category.SACRAMENTOS_ORACAO,
    title: 'Batismo',
    content: 'O sacramento do renascimento espiritual. Apaga o pecado original, nos faz filhos de Deus e membros da Igreja. É a porta dos sacramentos.',
    tags: ['batismo', 'iniciação', 'pecado original'],
    pageRef: '324'
  },
  {
    id: '17',
    category: Category.SACRAMENTOS_ORACAO,
    title: 'A Eucaristia',
    content: 'O maior dos sacramentos. Contém o Corpo, Sangue, Alma e Divindade de Jesus Cristo sob as aparências de pão e vinho. É sacrifício (Missa) e alimento (Comunhão).',
    tags: ['eucaristia', 'missa', 'comunhão', 'presença real', 'transubstanciação'],
    pageRef: '365'
  },
  {
    id: '18',
    category: Category.SACRAMENTOS_ORACAO,
    title: 'Penitência (Confissão)',
    content: 'Sacramento instituído para perdoar os pecados cometidos após o Batismo. Exige exame de consciência, contrição, propósito, confissão e satisfação.',
    tags: ['confissão', 'perdão', 'pecado', 'reconciliação'],
    pageRef: '453'
  },
  {
    id: '19',
    category: Category.SACRAMENTOS_ORACAO,
    title: 'A Oração',
    content: 'Elevação da mente e do coração a Deus. É necessária para a salvação. O Pai Nosso é a oração perfeita ensinada por Jesus.',
    tags: ['oração', 'pai nosso', 'prece'],
    pageRef: '560'
  },

  // --- APPENDIX: RESUMO (Q&A Style) ---
  {
    id: '20',
    category: Category.RESUMO,
    title: 'Qual foi o mandamento novo de Jesus?',
    content: 'O mandamento novo de Jesus foi: "Dou-vos um mandamento novo: que vos ameis uns aos outros como eu vos amei. Nisto conhecerão todos que sois meus discípulos".',
    tags: ['mandamento novo', 'amor', 'caridade'],
    pageRef: '600'
  },
  {
    id: '21',
    category: Category.RESUMO,
    title: 'Quais são as obras de misericórdia corporais?',
    content: '1º Dar de comer a quem tem fome; 2º Dar de beber a quem tem sede; 3º Vestir os nus; 4º Dar pousada aos peregrinos; 5º Visitar os enfermos e encarcerados; 6º Remir os cativos; 7º Enterrar os mortos.',
    tags: ['misericórdia', 'caridade', 'obras'],
    pageRef: '600'
  },
  {
    id: '22',
    category: Category.RESUMO,
    title: 'Quais são as obras de misericórdia espirituais?',
    content: '1º Dar bom conselho; 2º Ensinar os ignorantes; 3º Corrigir os que erram; 4º Consolar os aflitos; 5º Perdoar as injúrias; 6º Sofrer com paciência as fraquezas do próximo; 7º Rogar a Deus pelos vivos e defuntos.',
    tags: ['misericórdia', 'espiritual', 'conselho', 'perdão'],
    pageRef: '600'
  },
  {
    id: '23',
    category: Category.RESUMO,
    title: 'O que são os Novíssimos?',
    content: 'Os "novíssimos" ou as últimas coisas que nos hão de acontecer são: Morte, Juízo, Inferno e Paraíso.',
    tags: ['morte', 'juízo', 'inferno', 'céu', 'novíssimos'],
    pageRef: '606'
  },
  {
    id: '24',
    category: Category.RESUMO,
    title: 'O que é o Purgatório?',
    content: 'O purgatório é o lugar de sofrimento onde se purificam, antes de entrarem no céu, aqueles que morrem na graça de Deus, mas sem terem satisfeito pelos seus pecados.',
    tags: ['purgatório', 'purificação', 'almas'],
    pageRef: '607'
  },
  {
    id: '25',
    category: Category.RESUMO,
    title: 'Quais são os Pecados Capitais?',
    content: 'Os pecados capitais são sete: soberba, avareza, luxúria, ira, gula, inveja e preguiça.',
    tags: ['pecados capitais', 'vícios'],
    pageRef: '610'
  },
  {
    id: '26',
    category: Category.RESUMO,
    title: 'Quais são os Dons do Espírito Santo?',
    content: 'Os dons do Espírito Santo são sete: Sabedoria, Entendimento, Conselho, Fortaleza, Ciência, Piedade e Temor de Deus.',
    tags: ['espírito santo', 'dons'],
    pageRef: '614'
  }
];
