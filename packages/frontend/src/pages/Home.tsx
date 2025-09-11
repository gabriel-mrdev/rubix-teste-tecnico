import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LivroCard from '@/components/LivroCard';
import Notification from '@/components/Notification';
import { livroService } from '@/services/api';
import type { Livro } from '@/types/Livro';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<
    'titulo' | 'autor' | 'categoria'
  >('titulo');
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  useEffect(() => {
    carregarLivros();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
      setNotification({
        message: location.state.message,
        type: location.state.type || 'success',
      });
      // Limpar o state para não mostrar a notificação novamente
      navigate(location.pathname, { replace: true });
    }
  }, [location.state, navigate, location.pathname]);

  const carregarLivros = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await livroService.listarTodos();

      if (response.sucesso && response.dados) {
        setLivros(response.dados);
      } else {
        setError(response.erro || 'Erro ao carregar livros');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao carregar livros:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      carregarLivros();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      let response;

      switch (searchType) {
        case 'titulo':
          response = await livroService.buscarPorTitulo(searchTerm);
          break;
        case 'autor':
          response = await livroService.buscarPorAutor(searchTerm);
          break;
        case 'categoria':
          response = await livroService.buscarPorCategoria(searchTerm);
          break;
        default:
          response = await livroService.buscarPorTitulo(searchTerm);
      }

      if (response.sucesso && response.dados) {
        setLivros(response.dados);
      } else {
        setError(response.erro || 'Nenhum livro encontrado');
      }
    } catch (err) {
      setError('Erro ao buscar livros');
      console.error('Erro na busca:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este livro?')) {
      return;
    }

    try {
      const response = await livroService.deletar(id);
      if (response.sucesso) {
        setLivros(livros.filter(livro => livro.id !== id));
      } else {
        alert(response.erro || 'Erro ao excluir livro');
      }
    } catch (err) {
      alert('Erro ao excluir livro');
      console.error('Erro ao excluir:', err);
    }
  };

  const handleEdit = (livro: Livro) => {
    navigate(`/editar/${livro.id}`);
  };

  const handleView = (livro: Livro) => {
    navigate(`/livro/${livro.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              📚 Biblioteca Digital
            </h1>
            <Link
              to="/cadastrar"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              ➕ Novo Livro
            </Link>
          </div>

          {/* Busca */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Digite sua busca..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <div>
                <select
                  value={searchType}
                  onChange={e =>
                    setSearchType(
                      e.target.value as 'titulo' | 'autor' | 'categoria'
                    )
                  }
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="titulo">Título</option>
                  <option value="autor">Autor</option>
                  <option value="categoria">Categoria</option>
                </select>
              </div>
              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              >
                🔍 Buscar
              </button>
              <button
                onClick={carregarLivros}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
              >
                🔄 Limpar
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">Carregando livros...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erro</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            </div>
          </div>
        ) : livros.length === 0 ? (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Nenhum livro encontrado
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm
                ? 'Tente ajustar sua busca ou limpe os filtros.'
                : 'Comece adicionando um novo livro.'}
            </p>
            <div className="mt-6">
              <Link
                to="/cadastrar"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                ➕ Adicionar Livro
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                {livros.length}{' '}
                {livros.length === 1
                  ? 'livro encontrado'
                  : 'livros encontrados'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {livros.map(livro => (
                <LivroCard
                  key={livro.id}
                  livro={livro}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onView={handleView}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Notificação */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Home;
