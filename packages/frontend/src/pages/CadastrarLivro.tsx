import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LivroForm from '@/components/LivroForm';
import { livroService } from '@/services/api';
import type { CreateLivroRequest } from '@/types/Livro';

const CadastrarLivro: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (dados: CreateLivroRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await livroService.cadastrar(dados);

      if (response.sucesso) {
        // Sucesso - redirecionar para home
        navigate('/', {
          state: {
            message: 'Livro cadastrado com sucesso!',
            type: 'success',
          },
        });
      } else {
        setError(response.erro || 'Erro ao cadastrar livro');
      }
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao cadastrar livro:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

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
                📖 Cadastrar Novo Livro
              </h1>
              <p className="mt-2 text-gray-600">
                Preencha os dados abaixo para cadastrar um novo livro na
                biblioteca
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
          <LivroForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />

          {/* Informações adicionais */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-blue-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Informações Importantes
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Os campos marcados com * são obrigatórios</li>
                      <li>
                        O ano de publicação deve estar entre 1000 e{' '}
                        {new Date().getFullYear()}
                      </li>
                      <li>O preço deve estar entre R$ 0,00 e R$ 10.000,00</li>
                      <li>O número de páginas deve estar entre 1 e 10.000</li>
                      <li>
                        A data de cadastro será usada para organização dos
                        livros
                      </li>
                    </ul>
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

export default CadastrarLivro;
