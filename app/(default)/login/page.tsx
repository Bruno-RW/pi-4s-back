interface User {
  username: string;
  password: string;
}

const users: User[] = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

function login(username: string, password: string): string {
  const user = users.find(user => user.username === username && user.password === password);
  
  if (user) {
      return `Login bem-sucedido! Bem-vindo, ${username}.`;
  } else {
      return 'Usuário ou senha inválidos.';
  }
}

// Pra uso
const usernameInput = 'user1';
const passwordInput = 'password1';

const loginMessage = login(usernameInput, passwordInput);
console.log(loginMessage);