'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Erro ao verificar o link.' });
    }
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 500, margin: '60px auto', fontFamily: 'sans-serif', padding: '0 16px' }}>
      <h1>🛡️ LinkGuard</h1>
      <p>Cole um link para verificar se é seguro antes de clicar.</p>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://exemplo.com"
        style={{ width: '100%', padding: 10, fontSize: 16 }}
      />
      <button
        onClick={handleCheck}
        disabled={loading}
        style={{ marginTop: 10, padding: '10px 20px', fontSize: 16 }}
      >
        {loading ? 'Verificando...' : 'Verificar'}
      </button>

      {result && !result.error && (
        <div style={{ marginTop: 20, padding: 16, border: '1px solid #ccc', borderRadius: 8 }}>
          <p><strong>Status:</strong> {result.status}</p>
          <p><strong>Destino final:</strong> {result.finalUrl}</p>
          <p><strong>HTTPS válido:</strong> {result.https ? 'Sim' : 'Não'}</p>
        </div>
      )}
      {result?.error && <p style={{ color: 'red' }}>{result.error}</p>}
    </main>
  );
}
