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
    document.getElementById('usuarioMenu').innerText = `Logado como: ${usuario}`;

    // Carregar produtos no select
    await carregarProdutos();

    // Carregar histórico de movimentações
    await carregarMovimentacoes();
});

async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        const produtos = await response.json();
        const select = document.getElementById('id_produto');
        select.innerHTML = '';
        produtos.forEach(p => {
            const option = document.createElement('option');
            option.value = p.id_produto;
            option.textContent = p.nome;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

async function carregarMovimentacoes() {
    try {
        const response = await fetch('http://localhost:3000/movimentacoes');
        const movs = await response.json();
        const tbody = document.querySelector('#movTable tbody');
        tbody.innerHTML = '';
        movs.forEach(m => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${m.id_movimentacao}</td>
                <td>${m.nome}</td>
                <td>${m.tipo_movimentacao}</td>
                <td>${m.quantidade}</td>
                <td>${m.data_movimentacao}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar movimentações:', error);
    }
}

document.getElementById('movForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id_produto = document.getElementById('id_produto').value;
    const tipo_movimentacao = document.getElementById('tipo_movimentacao').value;
    const quantidade = document.getElementById('quantidade').value;

    // Aqui você precisa ter salvo o id do usuário no login
    const responsavel = sessionStorage.getItem('id_usuario');

    try {
        const response = await fetch('http://localhost:3000/movimentacoes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_produto, tipo_movimentacao, quantidade, responsavel })
        });

        if (response.ok) {
            alert('Movimentação registrada com sucesso!');
            carregarMovimentacoes();
        } else {
            const data = await response.json();
            alert(`Erro: ${data.message}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});

// Função de logout
function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}