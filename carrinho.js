
let carrinho = [];

function adicionarAoCarrinho(item) {
  carrinho.push(item);
  atualizarCarrinho();
}

function removerDoCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const container = document.getElementById("carrinho");
  container.innerHTML = "<h2>🛒 Carrinho</h2>";

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
  window.location.href = "finalizar.html";
}
