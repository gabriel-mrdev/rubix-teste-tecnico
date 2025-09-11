"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("@/services/LivroService");
class LivroController {
    constructor() {
        this.listarTodos = async (req, res) => {
            try {
                const resultado = await this.livroService.listarTodos();
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(500).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.buscarPorId = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const resultado = await this.livroService.buscarPorId(id);
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(404).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.cadastrar = async (req, res) => {
            try {
                const dados = req.body;
                const resultado = await this.livroService.cadastrar(dados);
                if (resultado.sucesso) {
                    res.status(201).json(resultado);
                }
                else {
                    res.status(400).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.atualizar = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const dados = { ...req.body, id };
                const resultado = await this.livroService.atualizar(id, dados);
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(400).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.deletar = async (req, res) => {
            try {
                const id = parseInt(req.params.id);
                const resultado = await this.livroService.deletar(id);
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(404).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.buscarPorCategoria = async (req, res) => {
            try {
                const categoria = req.params.categoria;
                const resultado = await this.livroService.buscarPorCategoria(categoria);
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(400).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.buscarPorAutor = async (req, res) => {
            try {
                const autor = req.params.autor;
                const resultado = await this.livroService.buscarPorAutor(autor);
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(400).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.buscarPorTitulo = async (req, res) => {
            try {
                const titulo = req.params.titulo;
                const resultado = await this.livroService.buscarPorTitulo(titulo);
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(400).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.obterEstatisticas = async (req, res) => {
            try {
                const resultado = await this.livroService.obterEstatisticas();
                if (resultado.sucesso) {
                    res.status(200).json(resultado);
                }
                else {
                    res.status(500).json(resultado);
                }
            }
            catch (error) {
                res.status(500).json({
                    sucesso: false,
                    erro: 'Erro interno do servidor',
                });
            }
        };
        this.livroService = new LivroService_1.LivroService();
    }
}
exports.LivroController = LivroController;
//# sourceMappingURL=LivroController.js.map