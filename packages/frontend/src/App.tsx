import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import CadastrarLivro from '@/pages/CadastrarLivro';
import EditarLivro from '@/pages/EditarLivro';
import DetalhesLivro from '@/pages/DetalhesLivro';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar" element={<CadastrarLivro />} />
          <Route path="/editar/:id" element={<EditarLivro />} />
          <Route path="/livro/:id" element={<DetalhesLivro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
