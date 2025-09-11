import React, { useState, useEffect } from 'react';
import type { Livro, CreateLivroRequest } from '@/types/Livro';

interface LivroFormProps {
  livro?: Livro;
  onSubmit: (livro: CreateLivroRequest) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const LivroForm: React.FC<LivroFormProps> = ({
  livro,
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<CreateLivroRequest>({
    titulo: '',
    autor: '',
    isbn: '',
    ano_publicacao: undefined,
    preco: undefined,
    data_cadastro: new Date().toISOString().split('T')[0],
    descricao: '',
    categoria: '',
    editora: '',
    numero_paginas: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (livro) {
      setFormData({
        titulo: livro.titulo,
        autor: livro.autor,
        isbn: livro.isbn || '',
        ano_publicacao: livro.ano_publicacao,
        preco: livro.preco,
        data_cadastro: livro.data_cadastro,
        descricao: livro.descricao || '',
        categoria: livro.categoria || '',
        editora: livro.editora || '',
        numero_paginas: livro.numero_paginas,
      });
    }
  }, [livro]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    }

    if (!formData.autor.trim()) {
      newErrors.autor = 'Autor é obrigatório';
    }

    if (!formData.data_cadastro) {
      newErrors.data_cadastro = 'Data de cadastro é obrigatória';
    }

    if (
      formData.ano_publicacao &&
      (formData.ano_publicacao < 1000 ||
        formData.ano_publicacao > new Date().getFullYear())
    ) {
      newErrors.ano_publicacao = `Ano deve estar entre 1000 e ${new Date().getFullYear()}`;
    }

    if (formData.preco && (formData.preco < 0 || formData.preco > 10000)) {
      newErrors.preco = 'Preço deve estar entre 0 e 10.000';
    }

    if (
      formData.numero_paginas &&
      (formData.numero_paginas < 1 || formData.numero_paginas > 10000)
    ) {
      newErrors.numero_paginas =
        'Número de páginas deve estar entre 1 e 10.000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'ano_publicacao' ||
        name === 'preco' ||
        name === 'numero_paginas'
          ? value
            ? Number(value)
            : undefined
          : value,
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Título */}
        <div className="md:col-span-2">
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-gray-700"
          >
            Título *
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.titulo ? 'border-red-500' : ''
            }`}
            placeholder="Digite o título do livro"
          />
          {errors.titulo && (
            <p className="mt-1 text-sm text-red-600">{errors.titulo}</p>
          )}
        </div>

        {/* Autor */}
        <div>
          <label
            htmlFor="autor"
            className="block text-sm font-medium text-gray-700"
          >
            Autor *
          </label>
          <input
            type="text"
            id="autor"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.autor ? 'border-red-500' : ''
            }`}
            placeholder="Digite o nome do autor"
          />
          {errors.autor && (
            <p className="mt-1 text-sm text-red-600">{errors.autor}</p>
          )}
        </div>

        {/* Data de Cadastro */}
        <div>
          <label
            htmlFor="data_cadastro"
            className="block text-sm font-medium text-gray-700"
          >
            Data de Cadastro *
          </label>
          <input
            type="date"
            id="data_cadastro"
            name="data_cadastro"
            value={formData.data_cadastro}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.data_cadastro ? 'border-red-500' : ''
            }`}
          />
          {errors.data_cadastro && (
            <p className="mt-1 text-sm text-red-600">{errors.data_cadastro}</p>
          )}
        </div>

        {/* ISBN */}
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-700"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite o ISBN"
          />
        </div>

        {/* Ano de Publicação */}
        <div>
          <label
            htmlFor="ano_publicacao"
            className="block text-sm font-medium text-gray-700"
          >
            Ano de Publicação
          </label>
          <input
            type="number"
            id="ano_publicacao"
            name="ano_publicacao"
            value={formData.ano_publicacao || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.ano_publicacao ? 'border-red-500' : ''
            }`}
            placeholder="Digite o ano de publicação"
            min="1000"
            max={new Date().getFullYear()}
          />
          {errors.ano_publicacao && (
            <p className="mt-1 text-sm text-red-600">{errors.ano_publicacao}</p>
          )}
        </div>

        {/* Preço */}
        <div>
          <label
            htmlFor="preco"
            className="block text-sm font-medium text-gray-700"
          >
            Preço (R$)
          </label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.preco ? 'border-red-500' : ''
            }`}
            placeholder="Digite o preço"
            min="0"
            max="10000"
            step="0.01"
          />
          {errors.preco && (
            <p className="mt-1 text-sm text-red-600">{errors.preco}</p>
          )}
        </div>

        {/* Categoria */}
        <div>
          <label
            htmlFor="categoria"
            className="block text-sm font-medium text-gray-700"
          >
            Categoria
          </label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite a categoria"
          />
        </div>

        {/* Editora */}
        <div>
          <label
            htmlFor="editora"
            className="block text-sm font-medium text-gray-700"
          >
            Editora
          </label>
          <input
            type="text"
            id="editora"
            name="editora"
            value={formData.editora}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Digite a editora"
          />
        </div>

        {/* Número de Páginas */}
        <div>
          <label
            htmlFor="numero_paginas"
            className="block text-sm font-medium text-gray-700"
          >
            Número de Páginas
          </label>
          <input
            type="number"
            id="numero_paginas"
            name="numero_paginas"
            value={formData.numero_paginas || ''}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              errors.numero_paginas ? 'border-red-500' : ''
            }`}
            placeholder="Digite o número de páginas"
            min="1"
            max="10000"
          />
          {errors.numero_paginas && (
            <p className="mt-1 text-sm text-red-600">{errors.numero_paginas}</p>
          )}
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label
          htmlFor="descricao"
          className="block text-sm font-medium text-gray-700"
        >
          Descrição
        </label>
        <textarea
          id="descricao"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Digite uma descrição do livro"
        />
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Salvando...' : livro ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
};

export default LivroForm;
