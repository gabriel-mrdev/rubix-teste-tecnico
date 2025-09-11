import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import livroRoutes from './routes/livroRoutes';
import { LivroService } from './services/LivroService';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de segurança
app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Middlewares de logging
app.use(morgan('combined'));

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Middleware de tratamento de erros
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    sucesso: false,
    erro: 'Erro interno do servidor',
  });
});

// Rotas
app.use('/api/livros', livroRoutes);

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({
    sucesso: true,
    mensagem: 'API funcionando corretamente',
    timestamp: new Date().toISOString(),
  });
});

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    sucesso: true,
    mensagem: 'API do Sistema CRUD de Livros - Case Técnico Rubix DTI Digital',
    version: '1.0.0',
    endpoints: {
      livros: '/api/livros',
      health: '/api/health',
    },
  });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    sucesso: false,
    erro: 'Rota não encontrada',
  });
});

// Inicializar serviço e servidor
async function iniciarServidor() {
  try {
    const livroService = new LivroService();
    await livroService.inicializar();

    app.listen(PORT, () => {
      console.log('='.repeat(60));
      console.log('    API SISTEMA CRUD DE LIVROS - RUBIX DTI');
      console.log('='.repeat(60));
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
      console.log(`📚 Endpoint principal: http://localhost:${PORT}/api/livros`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
      console.log('✅ Sistema inicializado com sucesso!');
      console.log('='.repeat(60));
    });
  } catch (error) {
    console.error('❌ Erro ao inicializar servidor:', error);
    process.exit(1);
  }
}

// Tratamento de sinais para encerramento gracioso
process.on('SIGINT', async () => {
  console.log('\n🛑 Recebido SIGINT. Encerrando servidor...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Recebido SIGTERM. Encerrando servidor...');
  process.exit(0);
});

// Tratamento de erros não capturados
process.on('uncaughtException', error => {
  console.error('❌ Erro não capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  console.error('❌ Promise rejeitada não tratada:', reason);
  process.exit(1);
});

// Iniciar servidor
iniciarServidor();
