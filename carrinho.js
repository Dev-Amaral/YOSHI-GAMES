let carrinho = [];

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  }
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();
}

function atualizarContadorCarrinho() {
  const contador = document.getElementById("contador-carrinho");
  if (!contador || !Array.isArray(carrinho)) return;

  let totalItens = 0;

  for (const item of carrinho) {
    const qtd = parseInt(item.quantidade);
    if (!isNaN(qtd)) {
      totalItens += qtd;
    }
  }

  contador.innerText = totalItens;
}

function adicionarAoCarrinho(novoItem) {
  const indexExistente = carrinho.findIndex(item => item.id === novoItem.id);
  if (indexExistente !== -1) {
    carrinho[indexExistente].quantidade += 1;
  } else {
    carrinho.push({ ...novoItem, quantidade: 1 });
  }

  salvarCarrinho();

  // Em vez de abrir o carrinho lateral, redireciona para a página de finalizar
  window.location.href = "finalizar.html";
}

function alterarQuantidade(index, delta) {
  carrinho[index].quantidade += delta;

  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }

  salvarCarrinho();
  renderizarCarrinho();
}

function removerItem(index) {
  carrinho.splice(index, 1);
  salvarCarrinho();
  renderizarCarrinho();
}

function renderizarCarrinho() {
  const listaPedidos = document.getElementById("lista-pedidos");
  if (!listaPedidos) return;

  listaPedidos.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    listaPedidos.innerHTML += `
      <div class="item-carrinho">
        <img src="${item.imagem}" alt="${item.nome}">
        <div class="informacoes-item">
          <h3>${item.nome}</h3>
          <p class="plataforma">Plataforma: ${detectarPlataforma(item.nome)}</p>
        </div>
        <div class="quantidade">
          <button onclick="alterarQuantidade(${index}, -1)">-</button>
          ${item.quantidade}
          <button onclick="alterarQuantidade(${index}, 1)">+</button>
        </div>
        <div class="preco">R$ ${subtotal.toFixed(2)}</div>
        <div class="acoes">
          <button class="btn btn-remove" onclick="removerItem(${index})">Remover</button>
        </div>
      </div>
    `;
  });

  const container = document.getElementById("resumo-pedido");
  if (container) {
    container.innerHTML = `
      <hr>
      <p style="font-size:20px;"><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
      <button class="btn-finalizar" onclick="finalizarCompra()">Finalizar Compra</button>
    `;
  }

  atualizarContadorCarrinho();
}

function detectarPlataforma(nome) {
  if (nome.includes("PS4") || nome.includes("PS5")) return "PlayStation";
  if (nome.includes("Xbox")) return "Xbox";
  if (nome.includes("Nintendo")) return "Nintendo Switch";
  return "Multiplataforma";
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione algum produto antes de finalizar a compra.");
    return;
  }

  localStorage.setItem("carrinhoFinalizado", JSON.stringify(carrinho));
  alert("Compra finalizada!");
  carrinho = [];
  salvarCarrinho();
  renderizarCarrinho();
}

// Inicialização
window.addEventListener('load', () => {
  carregarCarrinho();
  atualizarContadorCarrinho();
  renderizarCarrinho();
});
