export enum Category {
  CREDO = 'O Credo',
  MANDAMENTOS = 'Os Mandamentos',
  SACRAMENTOS_ORACAO = 'Sacramentos e Oração',
  RESUMO = 'Resumo Doutrinal'
}

export interface DoctrineEntry {
  id: string;
  category: Category;
  title: string; // The question or chapter title
  content: string; // The answer or summary
  pageRef?: string; // Reference to original page number if available
  tags: string[];
}

export type SearchState = {
  query: string;
  results: DoctrineEntry[];
};
