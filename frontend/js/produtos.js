window.onpageshow = function(event) {
    if (event.persisted) {
        window.location.reload();
    }
};

let produtoEditando = null;

document.addEventListener('DOMContentLoaded', async () => {
    const usuario = sessionStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('usuarioMenu').innerText = `Logado como: ${usuario}`;
    await carregarProdutos();
});

async function carregarProdutos() {
    try {
        const response = await fetch('http://localhost:3000/produtos');
        const produtos = await response.json();
        const tbody = document.querySelector('#produtosTable tbody');
        tbody.innerHTML = '';
        produtos.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.categoria}</td>
                <td>${p.preco}</td>
                <td>${p.estoque_atual}</td>
                <td>
                    <button onclick='editarProduto(${p.id_produto}, "${p.nome}", "${p.descricao}", "${p.categoria}", "${p.marca}", "${p.modelo}", ${p.estoque_minimo}, ${p.preco}, ${p.estoque_atual})'>Editar</button>
                    <button onclick='excluirProduto(${p.id_produto})'>Excluir</button>
                </td>`;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Erro ao carregar produtos:', error);
    }
}

function editarProduto(id, nome, descricao, categoria, marca, modelo, estoque_minimo, preco, estoque_atual) {
    produtoEditando = id;
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('categoria').value = categoria;
    document.getElementById('marca').value = marca;
    document.getElementById('modelo').value = modelo;
    document.getElementById('estoque_minimo').value = estoque_minimo;
    document.getElementById('preco').value = preco;
    document.getElementById('estoque_atual').value = estoque_atual;
}

async function excluirProduto(id) {
    try {
        await fetch(`http://localhost:3000/produtos/${id}`, { method: 'DELETE' });
        carregarProdutos();
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
    }
}

document.getElementById('produtoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const produto = {
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        categoria: document.getElementById('categoria').value,
        marca: document.getElementById('marca').value,
        modelo: document.getElementById('modelo').value,
        estoque_minimo: document.getElementById('estoque_minimo').value,
        estoque_atual: document.getElementById('estoque_atual').value,
        preco: document.getElementById('preco').value
    };

    try {
        if (produtoEditando) {
            await fetch(`http://localhost:3000/produtos/${produtoEditando}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
            produtoEditando = null;
        } else {
            await fetch('http://localhost:3000/produtos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
        }
        document.getElementById('produtoForm').reset();
        carregarProdutos();
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
    }
});

function logout() {
    sessionStorage.clear();
    window.location.href = 'login.html';
}