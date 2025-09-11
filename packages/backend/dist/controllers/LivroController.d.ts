import { Request, Response } from 'express';
export declare class LivroController {
    private livroService;
    constructor();
    listarTodos: (req: Request, res: Response) => Promise<void>;
    buscarPorId: (req: Request, res: Response) => Promise<void>;
    cadastrar: (req: Request, res: Response) => Promise<void>;
    atualizar: (req: Request, res: Response) => Promise<void>;
    deletar: (req: Request, res: Response) => Promise<void>;
    buscarPorCategoria: (req: Request, res: Response) => Promise<void>;
    buscarPorAutor: (req: Request, res: Response) => Promise<void>;
    buscarPorTitulo: (req: Request, res: Response) => Promise<void>;
    obterEstatisticas: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=LivroController.d.ts.map