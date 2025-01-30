'use client'

import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import _ from 'lodash';

interface Numero {
  reservado: boolean;
  pago: boolean;
  nome: string;
  telefone: string;
}

export default function Home() {
  const [numeros, setNumeros] = useState<Numero[]>(Array(1000).fill({
    reservado: false,
    pago: false,
    nome: '',
    telefone: ''
  }));
  
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [quantidadeCotas, setQuantidadeCotas] = useState(1);
  const [numerosEscolhidos, setNumerosEscolhidos] = useState<number[]>([]);
  const [customQuantidade, setCustomQuantidade] = useState('');

  const gerarNumerosAleatorios = () => {
    const numerosDisponiveis = [...Array(1000)].map((_, i) => i + 1)
      .filter(num => !numeros[num - 1].reservado);
    
    const numerosGerados = _.sampleSize(numerosDisponiveis, quantidadeCotas);
    setNumerosEscolhidos(numerosGerados);
  };

  const handleReservar = () => {
    if (!nome || !telefone) {
      alert('Por favor, preencha seu nome e telefone');
      return;
    }
    
    const novosNumeros = [...numeros];
    numerosEscolhidos.forEach(num => {
      novosNumeros[num - 1] = {
        ...novosNumeros[num - 1],
        reservado: true,
        nome,
        telefone
      };
    });
    
    setNumeros(novosNumeros);
    alert(`Cotas reservadas com sucesso! Seus números: ${numerosEscolhidos.join(', ')}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Cabeçalho */}
        <div className="bg-blue-600 text-white p-8 text-center">
          <h1 className="text-3xl font-bold mb-2">MEGA SORTEIO</h1>
          <p className="text-xl opacity-90">1000 cotas - R$ 2,00 cada</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Seção de Prêmios */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-center mb-6 flex items-center justify-center text-yellow-800">
              <Trophy className="text-yellow-600 mr-3 h-8 w-8" />
              Prêmios
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-yellow-100">
                <span className="text-lg font-semibold text-gray-800">1º Prêmio</span>
                <span className="text-xl font-bold text-green-600">R$ 600,00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-yellow-100">
                <span className="text-lg font-semibold text-gray-800">2º Prêmio</span>
                <span className="text-xl font-bold text-green-600">R$ 250,00</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-yellow-100">
                <span className="text-lg font-semibold text-gray-800">3º Prêmio</span>
                <span className="text-xl font-bold text-green-600">R$ 150,00</span>
              </div>
            </div>
          </div>

          {/* Seleção de Cotas */}
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-3">
              <button 
                className={`p-3 rounded-lg font-medium transition-all ${
                  quantidadeCotas === 1 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white border-2 border-blue-200 text-blue-600 hover:border-blue-400'
                }`}
                onClick={() => {
                  setQuantidadeCotas(1);
                  setCustomQuantidade('');
                }}
              >
                1 Cota
              </button>
              <button 
                className={`p-3 rounded-lg font-medium transition-all ${
                  quantidadeCotas === 5 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white border-2 border-blue-200 text-blue-600 hover:border-blue-400'
                }`}
                onClick={() => {
                  setQuantidadeCotas(5);
                  setCustomQuantidade('');
                }}
              >
                5 Cotas
              </button>
              <button 
                className={`p-3 rounded-lg font-medium transition-all ${
                  quantidadeCotas === 10 
                    ? 'bg-blue-600 text-white shadow-lg scale-105' 
                    : 'bg-white border-2 border-blue-200 text-blue-600 hover:border-blue-400'
                }`}
                onClick={() => {
                  setQuantidadeCotas(10);
                  setCustomQuantidade('');
                }}
              >
                10 Cotas
              </button>
              <input 
                type="number"
                placeholder="Qtd"
                className="p-3 rounded-lg border-2 border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none"
                value={customQuantidade}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setCustomQuantidade(e.target.value);
                  if (value > 0 && value <= 1000) {
                    setQuantidadeCotas(value);
                  }
                }}
                min="1"
                max="1000"
              />
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-lg font-semibold text-blue-900">
                Total: R$ {(quantidadeCotas * 2).toFixed(2)}
              </p>
            </div>

            <div className="space-y-4">
              <input 
                placeholder="Seu nome"
                className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <input 
                placeholder="Seu telefone"
                className="w-full p-4 rounded-lg border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 outline-none"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <button 
              className="w-full p-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
              onClick={gerarNumerosAleatorios}
            >
              Gerar {quantidadeCotas} número{quantidadeCotas > 1 ? 's' : ''} aleatório{quantidadeCotas > 1 ? 's' : ''}
            </button>

            {numerosEscolhidos.length > 0 && (
              <div className="p-6 bg-green-50 rounded-lg border-2 border-green-100">
                <p className="font-medium text-green-800 mb-2">Seus números:</p>
                <p className="text-2xl font-bold text-green-600">{numerosEscolhidos.join(', ')}</p>
              </div>
            )}
            
            {/* Informações de Pagamento */}
            <div className="bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
              <h2 className="text-lg font-bold mb-3">Pagamento PIX</h2>
              <p className="text-gray-600">Chave: 123.456.789-00</p>
            </div>

            {numerosEscolhidos.length > 0 && (
              <button 
                className="w-full p-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg"
                onClick={() => {
                  handleReservar();
                  window.open('https://chat.whatsapp.com/KoOedKPL7oxISmSScmNVNu', '_blank');
                }}
              >
                Confirmar Pagamento
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}