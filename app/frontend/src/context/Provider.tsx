import React, { useState } from 'react';
import Context from './Context';

interface EntradaItem {
  product_code: number;
  new_price: number;
}

interface EntradaState {
  produtos: EntradaItem[];
  styleName: string;
}

interface SaidaItem {
  codigo: string;
  nome: string;
  precoAtual: number;
  novoPreco: number;
}

interface SaidaState {
  mensagem: SaidaItem[];
  styleName: string;
}

function Provider({ children }: { children: React.ReactNode }) {
  const [arquivo, setArquivo] = useState<string>('');
  const [entrada, setEntrada] = useState<EntradaState>({
      produtos: [
        {
          product_code: 0,
          new_price: 0.0,
        },
      ],
      styleName: '',
    });
  const [saida, setSaida] = useState<SaidaState>({
    mensagem: [
      {
        codigo: '000',
        nome: 'Produto 0',
        precoAtual: 0.0,
        novoPreco: 0.0,
      },
    ],
    styleName: 'saida-visivel',
  });
  const [btnAtualizar, setBtnAtualizar] = useState<boolean>(true);

  const memorize = React.useMemo(
    () => ({
      arquivo, setArquivo,
      saida, setSaida,
      btnAtualizar, setBtnAtualizar,
      entrada, setEntrada,
    }),
    [
      arquivo, setArquivo,
      saida, setSaida,
      btnAtualizar, setBtnAtualizar,
      entrada, setEntrada,
    ],
  )
  return <Context.Provider value={memorize}>{children}</Context.Provider>
}

export default Provider
