'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    fetch(apiUrl)
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage('Erro ao conectar ao backend: ' + err.message));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Projeto +Contábil</h1>
        <p className="text-xl">
          Mensagem do Backend: <span className="text-blue-500 font-bold">{message}</span>
        </p>
      </div>
    </main>
  );
}
