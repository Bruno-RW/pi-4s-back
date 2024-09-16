import React, { useState} from "react";
const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === 'teste@example.com' && password === 'senha123') {
      alert('Login bem-sucedido!');
    } else {
      setError('Credenciais inválidas');
    }
  }
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
    <h1>Login</h1>
    {error && <div style={{ color: 'red' }}>{error}</div>}
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="password">Senha:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
        Entrar
      </button>
    </form>
  </div>
);
};

export default LoginPage;