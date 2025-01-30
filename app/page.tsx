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
    <main className="flex min-h-screen flex-col items-center p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center mb-4">MEGA SORTEIO - 1000 cotas</h1>
        <p className="text-center mb-2">R$ 2,00 cada cota</p>

        {/* Seção de Prêmios */}
        <div className="mb-6 bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-center mb-4 flex items-center justify-center">
            <Trophy className="text-yellow-500 mr-2" />
            Prêmios
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
              <span className="font-semibold">1º Prêmio:</span>
              <span className="text-green-600 font-bold">R$ 600,00</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
              <span className="font-semibold">2º Prêmio:</span>
              <span className="text-green-600 font-bold">R$ 250,00</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded shadow-sm">
              <span className="font-semibold">3º Prêmio:</span>
              <span className="text-green-600 font-bold">R$ 150,00</span>
            </div>
          </div>
        </div>

        {/* Seleção de Cotas */}
        <div className="space-y-4">
          <div className="grid grid-cols-4 gap-2">
            <button 
              className={`p-2 rounded ${quantidadeCotas === 1 ? 'bg-blue-500 text-white' : 'border'}`}
              onClick={() => {
                setQuantidadeCotas(1);
                setCustomQuantidade('');
              }}
            >
              1 Cota
            </button>
            <button 
              className={`p-2 rounded ${quantidadeCotas === 5 ? 'bg-blue-500 text-white' : 'border'}`}
              onClick={() => {
                setQuantidadeCotas(5);
                setCustomQuantidade('');
              }}
            >
              5 Cotas
            </button>
            <button 
              className={`p-2 rounded ${quantidadeCotas === 10 ? 'bg-blue-500 text-white' : 'border'}`}
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
              className="w-full p-2 border rounded"
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

          <p className="text-center font-semibold">
            Total: R$ {(quantidadeCotas * 2).toFixed(2)}
          </p>

          <input 
            placeholder="Nome"
            className="w-full p-2 border rounded"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input 
            placeholder="Telefone"
            className="w-full p-2 border rounded"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <button 
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={gerarNumerosAleatorios}
          >
            Gerar {quantidadeCotas} número{quantidadeCotas > 1 ? 's' : ''} aleatório{quantidadeCotas > 1 ? 's' : ''}
          </button>

          {numerosEscolhidos.length > 0 && (
            <div className="p-4 border rounded-lg">
              <p className="font-semibold mb-2">Seus números:</p>
              <p className="text-green-600">{numerosEscolhidos.join(', ')}</p>
            </div>
          )}
          
          {/* Informações de Pagamento */}
          <div className="border p-4 rounded">
            <h2 className="font-bold mb-2">Pagamento PIX</h2>
            <p>Chave: 123.456.789-00</p>
          </div>

          {numerosEscolhidos.length > 0 && (
            <button 
              className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
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
    </main>
  );
}