import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { livroService } from '@/services/api';
import type { Livro } from '@/types/Livro';

const DetalhesLivro: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarLivro();
  }, [id]);

  const carregarLivro = async () => {
    if (!id) {
      setError('ID do livro não fornecido');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    if (livro?.id) {
      navigate(`/editar/${livro.id}`);
    }
  };

  const handleDelete = async () => {
    if (!livro?.id) return;

    if (
      !window.confirm(
        `Tem certeza que deseja excluir o livro "${livro.titulo}"?`
      )
    ) {
      return;
    }

    try {
      const response = await livroService.deletar(livro.id);

      if (response.sucesso) {
        navigate('/', {
          state: {
            message: 'Livro excluído com sucesso!',
            type: 'success',
          },
        });
      } else {
        alert(response.erro || 'Erro ao excluir livro');
      }
    } catch (err) {
      alert('Erro ao excluir livro');
      console.error('Erro ao excluir:', err);
    }
  };

  const formatarPreco = (preco?: number): string => {
    if (!preco) return 'Não informado';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(preco);
  };

  const formatarData = (data: string): string => {
    try {
      return new Date(data).toLocaleDateString('pt-BR');
    } catch {
      return 'Data inválida';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando detalhes do livro...</p>
        </div>
      </div>
    );
  }

  if (error || !livro) {
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
                  <p>{error || 'Livro não encontrado'}</p>
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
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
                  📖 Detalhes do Livro
                </h1>
                <p className="mt-2 text-gray-600">
                  Informações completas sobre o livro
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleEdit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Excluir
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Cabeçalho do livro */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-12 text-white">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-4">{livro.titulo}</h2>
                <p className="text-xl text-indigo-100 mb-2">
                  por {livro.autor}
                </p>
                {livro.categoria && (
                  <span className="inline-block bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {livro.categoria}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">
                  {formatarPreco(livro.preco)}
                </div>
                {livro.ano_publicacao && (
                  <div className="text-indigo-100">
                    Publicado em {livro.ano_publicacao}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Detalhes do livro */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Informações principais */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Informações Principais
                </h3>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Título
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {livro.titulo}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Autor</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {livro.autor}
                    </dd>
                  </div>
                  {livro.isbn && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        ISBN
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 font-mono">
                        {livro.isbn}
                      </dd>
                    </div>
                  )}
                  {livro.editora && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Editora
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {livro.editora}
                      </dd>
                    </div>
                  )}
                  {livro.categoria && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Categoria
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {livro.categoria}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Informações técnicas */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Informações Técnicas
                </h3>
                <dl className="space-y-4">
                  {livro.ano_publicacao && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Ano de Publicação
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {livro.ano_publicacao}
                      </dd>
                    </div>
                  )}
                  {livro.numero_paginas && (
                    <div>
                      <dt className="text-sm font-medium text-gray-500">
                        Número de Páginas
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {livro.numero_paginas} páginas
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Preço</dt>
                    <dd className="mt-1 text-sm text-gray-900 font-semibold">
                      {formatarPreco(livro.preco)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Data de Cadastro
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {formatarData(livro.data_cadastro)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      ID do Livro
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 font-mono">
                      #{livro.id}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Descrição */}
            {livro.descricao && (
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Descrição
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {livro.descricao}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalhesLivro;
