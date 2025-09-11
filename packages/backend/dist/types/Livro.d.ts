export interface Livro {
    id?: number;
    titulo: string;
    autor: string;
    isbn?: string;
    ano_publicacao?: number;
    preco?: number;
    data_cadastro: string;
    descricao?: string;
    categoria?: string;
    editora?: string;
    numero_paginas?: number;
}
export interface CreateLivroRequest {
    titulo: string;
    autor: string;
    isbn?: string;
    ano_publicacao?: number;
    preco?: number;
    data_cadastro: string;
    descricao?: string;
    categoria?: string;
    editora?: string;
    numero_paginas?: number;
}
export interface UpdateLivroRequest extends Partial<CreateLivroRequest> {
    id: number;
}
export interface ApiResponse<T> {
    sucesso: boolean;
    dados?: T;
    erro?: string;
    mensagem?: string;
    total?: number;
}
export interface ListaLivrosResponse {
    livros: Livro[];
    total: number;
}
export interface EstatisticasResponse {
    total_livros: number;
    total_categorias: number;
    total_autores: number;
    categorias: string[];
    autores: string[];
}
//# sourceMappingURL=Livro.d.ts.map