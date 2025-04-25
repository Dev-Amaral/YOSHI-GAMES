let carrinho = [];

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  }
}

function adicionarAoCarrinho(novoItem) {
  const indexExistente = carrinho.findIndex(item => item.id === novoItem.id);
  if (indexExistente !== -1) {
    carrinho[indexExistente].quantidade += 1;
  } else {
    carrinho.push({ ...novoItem, quantidade: 1 });
  }
  salvarCarrinho();
  atualizarCarrinho();
}

function alterarQuantidade(index, delta) {
  carrinho[index].quantidade += delta;

  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }

  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const container = document.getElementById("carrinho");
  container.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <h2>🛒 Carrinho</h2>
      <button onclick="fecharCarrinho()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">✕</button>
    </div>
  `;

  carrinho.forEach((item, index) => {
    container.innerHTML += `
      <div class="item-carrinho">
        <img style="height:70px;" src="${item.imagem}" />
        <span>
          <p style="font-size:20px;">${item.nome}</p>
          <div style="display: flex; align-items: center; gap: 10px; font-size: 16px;">
            <button onclick="alterarQuantidade(${index}, -1)">➖</button>
            <span><strong>${item.quantidade}</strong></span>
            <button onclick="alterarQuantidade(${index}, 1)">➕</button>
            <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
          </div>
        </span>
      </div>
    `;
  });

  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);
  container.innerHTML += `
    <hr>
    <p style="font-size:20px;"><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
    <button class="btn-finalizar" onclick="finalizarCompra()">Finalizar Compra</button>
  `;
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio! Adicione algum produto antes de finalizar a compra.");
    return;
  }

  localStorage.setItem("carrinhoFinalizado", JSON.stringify(carrinho));
  window.open("finalizar.html", "_blank");
}


function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function toggleCarrinho() {
  const carrinho = document.getElementById("carrinho");
  carrinho.style.display = carrinho.style.display === "none" ? "block" : "none";
}

function fecharCarrinho() {
  document.getElementById("carrinho").style.display = "none";
}

// Início
carregarCarrinho();
atualizarCarrinho();
// Quando voltar para a página inicial, recarregar o carrinho
window.addEventListener('load', () => {
  carregarCarrinho();
  atualizarCarrinho();
});
