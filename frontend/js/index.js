// Força recarregamento ao voltar pelo botão do navegador
window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    const usuario = sessionStorage.getItem('usuario');

    // Se não estiver autenticado, redireciona para login
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }

    // Exibe usuário logado no menu
    const usuarioMenu = document.getElementById('usuarioMenu');
    if (usuarioMenu) {
        usuarioMenu.innerText = `Logado como: ${usuario}`;
    }

    // Exibe usuário logado no corpo da página (opcional)
    const usuarioLogado = document.getElementById('usuarioLogado');
    if (usuarioLogado) {
        usuarioLogado.innerText = 'Usuário logado: ' + usuario;
    }

    // Carregar alertas
    try {
        const response = await fetch('http://localhost:3000/alertas');
        const alertas = await response.json();
        document.getElementById('alertas').innerHTML = alertas.length
            ? alertas.map(a => `<p>${a.mensagem} - Produto: ${a.nome}</p>`).join('')
            : '<p>Nenhum alerta ativo.</p>';
    } catch (error) {
        console.error('Erro ao carregar alertas:', error);
        document.getElementById('alertas').innerHTML = '<p>Erro ao carregar alertas.</p>';
    }
});

// Função de logout
function logout() {
    sessionStorage.clear(); // Remove dados do usuário
    window.location.href = 'login.html'; // Redireciona para login
}