import { Request, Response } from 'express';
import { LivroService } from '../services/LivroService';
import type { CreateLivroRequest, UpdateLivroRequest } from '../types/Livro';

/**
 * Controller para operações relacionadas a livros
 */
export class LivroController {
  private livroService: LivroService;

  constructor() {
    this.livroService = new LivroService();
  }

  /**
   * Lista todos os livros
   */
  public listarTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const resultado = await this.livroService.listarTodos();

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(500).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Busca livro por ID
   */
  public buscarPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const resultado = await this.livroService.buscarPorId(id);

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(404).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Cadastra novo livro
   */
  public cadastrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const dados: CreateLivroRequest = req.body;
      const resultado = await this.livroService.cadastrar(dados);

      if (resultado.sucesso) {
        res.status(201).json(resultado);
      } else {
        res.status(400).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Atualiza livro existente
   */
  public atualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const dados: UpdateLivroRequest = { ...req.body, id };
      const resultado = await this.livroService.atualizar(id, dados);

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(400).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Deleta livro
   */
  public deletar = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const resultado = await this.livroService.deletar(id);

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(404).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Busca livros por categoria
   */
  public buscarPorCategoria = async (req: Request, res: Response): Promise<void> => {
    try {
      const categoria = req.params.categoria;
      const resultado = await this.livroService.buscarPorCategoria(categoria);

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(400).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Busca livros por autor
   */
  public buscarPorAutor = async (req: Request, res: Response): Promise<void> => {
    try {
      const autor = req.params.autor;
      const resultado = await this.livroService.buscarPorAutor(autor);

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(400).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Busca livros por título
   */
  public buscarPorTitulo = async (req: Request, res: Response): Promise<void> => {
    try {
      const titulo = req.params.titulo;
      const resultado = await this.livroService.buscarPorTitulo(titulo);

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(400).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };

  /**
   * Obtém estatísticas do sistema
   */
  public obterEstatisticas = async (req: Request, res: Response): Promise<void> => {
    try {
      const resultado = await this.livroService.obterEstatisticas();

      if (resultado.sucesso) {
        res.status(200).json(resultado);
      } else {
        res.status(500).json(resultado);
      }
    } catch (error) {
      res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
      });
    }
  };
}
