<template>
  <div class="main-container">
    <!-- Primeiro container com o título 'Carrinho de compras' -->
    <div class="title-container first-container">
      <h1>Carrinho de compras</h1>
    </div>

    <!-- Produto 1 -->
    <div class="title-container custom-container">
      <div class="product-card">
        <a :href="require('@/assets/TECLADO.png')" target="_blank">
          <img src="@/assets/TECLADO.png"
               alt="Teclado Logitech Silencioso"
               class="product-image"
               style="width: 90px; height: 75px; margin-left: 15px"/>
        </a>
        <div class="product-info">
          <div class="text-info">
            <h3>Teclado Logitech Silent Touch</h3>
            <div class="rating">
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9734;</span>
              <span class="star">&#9734;</span>
              <span class="ratings-count">(935 avaliações)</span>
            </div>
            <p class="price">R$ 199,90</p>
          </div>
          <button @click="adicionarAoCarrinho(produtos[0])" class="add-to-cart-button">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>

    <!-- Produto 2 -->
    <div class="title-container custom-container">
      <div class="product-card">
        <a :href="require('@/assets/PLACA DE VIDEO.png')" target="_blank">
          <img src="@/assets/PLACA DE VIDEO.png"
               alt="Placa De Vídeo Gigabyte NVIDIA GeForce RTX 4090 AORUS MASTER, 24GB..."
               class="product-image"
               style="width: 90px; height: 75px; margin-left: 15px"/>
        </a>
        <div class="product-info">
          <div class="text-info">
            <h3>Placa De Vídeo Gigabyte NVIDIA GeForce <p>RTX 4090 AORUS MASTER, 24GB...</p></h3>
            <div class="rating">
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9734;</span>
              <span class="ratings-count">(128 avaliações)</span>
            </div>
            <p class="price">R$ 13.899,90</p>
          </div>
          <button @click="adicionarAoCarrinho(produtos[1])" class="add-to-cart-button">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>

    <!-- Produto 3 -->
    <div class="title-container custom-container">
      <div class="product-card">
        <a :href="require('@/assets/PENDRIVE.png')" target="_blank">
          <img src="@/assets/PENDRIVE.png"
               alt="Pen Drive 128gb Cruzer Blade - Sandisk"
               class="product-image"
               style="width: 90px; height: 75px; margin-left: 15px"/>
        </a>
        <div class="product-info">
          <div class="text-info">
            <h3>Pen Drive 128gb Cruzer Blade - Sandisk</h3>
            <div class="rating">
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9734;</span>
              <span class="ratings-count">(128 avaliações)</span>
            </div>
            <p class="price">R$ 79,80</p>
          </div>
          <button @click="adicionarAoCarrinho(produtos[2])" class="add-to-cart-button">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>

    <!-- Botões -->
    <div class="buttons-container">
      <button @click="carregarMaisProdutos" class="button">Carregar mais produtos</button>
      <button @click="$router.push('/PAGINA2')" class="button ir-para-carrinho">Ir para o carrinho</button>
    </div>

    <!-- Modal de Confirmação de Adição ao Carrinho -->
    <div v-if="isCartModalOpen" class="modal">
      <div class="modal-content">
        <button @click="closeCartModal" class="close-button">&times;</button>
        <h2>Sucesso!</h2>
        <hr class="modal-divider">
        <p class="modal-message">{{ modalMessage }}</p>
        <button @click="closeCartModal" class="ok-button">✔ OK</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      produtos: [
        {
          id: 1,
          nome: "Teclado Logitech Silent Touch",
          descricao: "Teclado silencioso para escritório",
          preco: 199.9,
          quantidade: 1,
          imagem: require('@/assets/TECLADO.png')
        },
        {
          id: 2,
          nome: "Placa De Vídeo Gigabyte NVIDIA GeForce RTX 4090 AORUS MASTER, 24GB",
          descricao: "Placa de vídeo poderosa para jogos",
          preco: 13899.9,
          quantidade: 1,
          imagem: require('@/assets/PLACA DE VIDEO.png')
        },
        {
          id: 3,
          nome: "Pen Drive 128gb Cruzer Blade - Sandisk",
          descricao: "Pen drive USB de 128GB",
          preco: 79.8,
          quantidade: 1,
          imagem: require('@/assets/PENDRIVE.png')
        }
      ],
      visibleProducts: 3,
      totalProducts: 10,
      isCartModalOpen: false,
      modalMessage: ""
    };
  },
  methods: {
    adicionarAoCarrinho(produto) {
      if (!produto) {
        console.error("Produto não encontrado.");
        return;
      }

      // Verifica se o produto já está no carrinho
      const produtoNoCarrinho = this.$store.getters.cartItems.find(item => item.id === produto.id);
      if (produtoNoCarrinho) {
        this.modalMessage = `${produto.nome} já está no carrinho!`;
      } else {
        this.$store.commit("ADD_TO_CART", produto);
        this.modalMessage = `${produto.nome} foi adicionado ao carrinho!`;
      }

      this.isCartModalOpen = true; // Abre o modal de confirmação
    },
    closeCartModal() {
      this.isCartModalOpen = false;
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.title-container {
  width: 50%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #23242C;
  padding: 10px 0;
  margin: 1px;
}

h1 {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  margin-left: -498px;
  color: white;
}

.first-container {
  height: 30px;
  width: 50%;
  margin: auto;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-card {
  display: flex;
  width: 100%;
  align-items: center;
}

.product-image {
  width: 122px;
  height: 122px;
  margin-right: 25px;
  border-radius: 6px;
}

.product-info {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.text-info {
  display: flex;
  flex-direction: column;
}

.add-to-cart-button {
  position: relative;
  top: -60px;
  left: -30px;
  margin-left: 350px;
  background-color: #39115C;
  border: 2px solid #A33AFF;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.add-to-cart-button:hover {
  background-color: #2e9929;
}

.rating {
  display: flex;
  align-items: center;
  font-size: 20px;
}

.star {
  color: #FFAE00;
  margin-right: 1px;
}

.ratings-count {
  font-size: 13px;
  color: #646464;
  margin-left: 10px;
}

h3, p {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  margin: 0;
  color: white;
}

.product-info p.price {
  font-size: 29px;
  color: #A33AFF;
}

.buttons-container {
  width: 40%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button, .ir-para-carrinho {
  width: 338px;
  height: 45px;
  margin: 10px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #6200ea;
}

.button:hover {
  background-color: #3700b3;
}

.ir-para-carrinho {
  background-color: #39CC33;
}

.ir-para-carrinho:hover {
  background-color: #2e9929;
}

.main-container {
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #23242C;
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  color: white;
  text-align: left;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: white;
  cursor: pointer;
}

.ok-button {
  background-color: #39CC33;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  float: right;
}

.modal-divider {
  border: 0;
  height: 1px;
  background: #555;
  margin: 10px 0;
}

.modal-message {
  font-size: 16px;
  font-weight: bold;
  color: white;
}

</style>
