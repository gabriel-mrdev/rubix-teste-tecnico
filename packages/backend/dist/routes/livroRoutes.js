"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LivroController_1 = require("@/controllers/LivroController");
const router = (0, express_1.Router)();
const livroController = new LivroController_1.LivroController();
router.get('/', livroController.listarTodos);
router.get('/estatisticas', livroController.obterEstatisticas);
router.get('/:id', livroController.buscarPorId);
router.post('/', livroController.cadastrar);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);
router.get('/categoria/:categoria', livroController.buscarPorCategoria);
router.get('/autor/:autor', livroController.buscarPorAutor);
router.get('/titulo/:titulo', livroController.buscarPorTitulo);
exports.default = router;
//# sourceMappingURL=livroRoutes.js.map