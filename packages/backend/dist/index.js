"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const livroRoutes_1 = __importDefault(require("@/routes/livroRoutes"));
const LivroService_1 = require("@/services/LivroService");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
        sucesso: false,
        erro: 'Erro interno do servidor',
    });
});
app.use('/api/livros', livroRoutes_1.default);
app.get('/api/health', (req, res) => {
    res.json({
        sucesso: true,
        mensagem: 'API funcionando corretamente',
        timestamp: new Date().toISOString(),
    });
});
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
app.use('*', (req, res) => {
    res.status(404).json({
        sucesso: false,
        erro: 'Rota não encontrada',
    });
});
async function iniciarServidor() {
    try {
        const livroService = new LivroService_1.LivroService();
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
    }
    catch (error) {
        console.error('❌ Erro ao inicializar servidor:', error);
        process.exit(1);
    }
}
process.on('SIGINT', async () => {
    console.log('\n🛑 Recebido SIGINT. Encerrando servidor...');
    process.exit(0);
});
process.on('SIGTERM', async () => {
    console.log('\n🛑 Recebido SIGTERM. Encerrando servidor...');
    process.exit(0);
});
process.on('uncaughtException', error => {
    console.error('❌ Erro não capturado:', error);
    process.exit(1);
});
process.on('unhandledRejection', reason => {
    console.error('❌ Promise rejeitada não tratada:', reason);
    process.exit(1);
});
iniciarServidor();
//# sourceMappingURL=index.js.map