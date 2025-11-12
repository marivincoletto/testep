document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch('http://localhost:3000/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, senha })
    });

    const data = await response.json();
    if (response.ok) {
        alert('Login realizado com sucesso!');
        sessionStorage.setItem('usuario', data.usuario.nome);
        sessionStorage.setItem('id_usuario', data.usuario.id); // Adiciona o ID
        window.location.href = 'index.html';
    } else {
        alert(data.message);
    }
});
