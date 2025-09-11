import React from 'react';
import type { Livro } from '@/types/Livro';

interface LivroCardProps {
  livro: Livro;
  onEdit: (livro: Livro) => void;
  onDelete: (id: number) => void;
  onView: (livro: Livro) => void;
}

const LivroCard: React.FC<LivroCardProps> = ({
  livro,
  onEdit,
  onDelete,
  onView,
}) => {
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

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {livro.titulo}
          </h3>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Autor:</span> {livro.autor}
          </p>
          {livro.categoria && (
            <p className="text-gray-600 mb-1">
              <span className="font-medium">Categoria:</span> {livro.categoria}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onView(livro)}
            className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
            title="Ver detalhes"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
          <button
            onClick={() => onEdit(livro)}
            className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
            title="Editar"
          >
            <svg
              className="w-5 h-5"
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
          </button>
          <button
            onClick={() => onDelete(livro.id!)}
            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
            title="Excluir"
          >
            <svg
              className="w-5 h-5"
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
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Preço:</span>{' '}
          {formatarPreco(livro.preco)}
        </div>
        <div>
          <span className="font-medium">Ano:</span>{' '}
          {livro.ano_publicacao || 'Não informado'}
        </div>
        <div>
          <span className="font-medium">Páginas:</span>{' '}
          {livro.numero_paginas || 'Não informado'}
        </div>
        <div>
          <span className="font-medium">Cadastro:</span>{' '}
          {formatarData(livro.data_cadastro)}
        </div>
      </div>

      {livro.descricao && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 line-clamp-2">
            {livro.descricao}
          </p>
        </div>
      )}

      {livro.isbn && (
        <div className="mt-2">
          <span className="text-xs text-gray-500">ISBN: {livro.isbn}</span>
        </div>
      )}
    </div>
  );
};

export default LivroCard;
