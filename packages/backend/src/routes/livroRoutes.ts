import { Router } from 'express';
import { LivroController } from '../controllers/LivroController';

const router = Router();
const livroController = new LivroController();

// Rotas CRUD básicas
router.get('/', livroController.listarTodos);
router.get('/estatisticas', livroController.obterEstatisticas);
router.get('/:id', livroController.buscarPorId);
router.post('/', livroController.cadastrar);
router.put('/:id', livroController.atualizar);
router.delete('/:id', livroController.deletar);

// Rotas de busca
router.get('/categoria/:categoria', livroController.buscarPorCategoria);
router.get('/autor/:autor', livroController.buscarPorAutor);
router.get('/titulo/:titulo', livroController.buscarPorTitulo);

export default router;
