
let carrinho = [];

// Tenta carregar do localStorage quando o script for iniciado
function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  }
}


function adicionarAoCarrinho(item) {
  carrinho.push(item);
  salvarCarrinho();
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
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
        <img src="${item.imagem}" />
        <span>${item.nome}<br>R$ ${item.preco.toFixed(2)}</span>
        <button onclick="removerDoCarrinho(${index})">✕</button>
      </div>
    `;
  });


  const total = carrinho.reduce((soma, item) => soma + item.preco, 0);
  container.innerHTML += `
  <hr>
  <p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>
  <button class="btn-finalizar" onclick="finalizarCompra()">Finalizar Compra</button>
`;

  container.innerHTML += `<hr><p><strong>Total:</strong> R$ ${total.toFixed(2)}</p>`;
}
function finalizarCompra() {
  localStorage.setItem("carrinhoFinalizado", JSON.stringify(carrinho));
  window.open("finalizar.html", "_blank");
}


function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function carregarCarrinho() {
  const carrinhoSalvo = localStorage.getItem("carrinho");
  if (carrinhoSalvo) {
    carrinho = JSON.parse(carrinhoSalvo);
  }
}

function toggleCarrinho() {
  const carrinho = document.getElementById("carrinho");
  carrinho.style.display = carrinho.style.display === "none" ? "block" : "none";
}

function fecharCarrinho() {
  document.getElementById("carrinho").style.display = "none";
}

// Carrega o carrinho assim que a página for aberta
carregarCarrinho();
atualizarCarrinho();

