import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LivroForm from '@/components/LivroForm';
import { livroService } from '@/services/api';
import type { Livro, UpdateLivroRequest } from '@/types/Livro';

const EditarLivro: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLivro, setIsLoadingLivro] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarLivro();
  }, [id]);

  const carregarLivro = async () => {
    if (!id) {
      setError('ID do livro não fornecido');
      setIsLoadingLivro(false);
      return;
    }

    try {
      setIsLoadingLivro(true);
      setError(null);

      const response = await livroService.buscarPorId(parseInt(id));

      if (response.sucesso && response.dados) {
        setLivro(response.dados);
      } else {
        setError(response.erro || 'Livro não encontrado');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao carregar livro:', err);
    } finally {
      setIsLoadingLivro(false);
    }
  };

  const handleSubmit = async (dados: UpdateLivroRequest) => {
    if (!id) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await livroService.atualizar(parseInt(id), dados);

      if (response.sucesso) {
        // Sucesso - redirecionar para home
        navigate('/', {
          state: {
            message: 'Livro atualizado com sucesso!',
            type: 'success',
          },
        });
      } else {
        setError(response.erro || 'Erro ao atualizar livro');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao atualizar livro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoadingLivro) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando dados do livro...</p>
        </div>
      </div>
    );
  }

  if (error && !livro) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-6">
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
                <div className="mt-4">
                  <button
                    onClick={() => navigate('/')}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Voltar para Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="mr-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
              title="Voltar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ✏️ Editar Livro
              </h1>
              <p className="mt-2 text-gray-600">
                Editando: <span className="font-medium">{livro?.titulo}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Mensagem de erro */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
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
          )}

          {/* Formulário */}
          {livro && (
            <LivroForm
              livro={livro}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          )}

          {/* Informações adicionais */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-yellow-50 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Atenção
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Ao editar este livro, as alterações serão salvas
                      permanentemente. Certifique-se de que todas as informações
                      estão corretas antes de salvar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarLivro;
