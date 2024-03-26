import React, { useState } from 'react';
import './Login.css'

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica para enviar as credenciais para o servidor e autenticar o usuário
  };
  
  return (
    <div className='background'>
      <div className='left'>
          <h1>LOG-IN</h1>
          <p>Bem Vindo de volta!</p>
        </div>
      <div className='right'>
            <div className='container'>
            <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='username'>Username: </label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor='password'>Password: </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type='submit'>Login</button>
          </form>

          </div>
        </div>
    </div>
  )
}