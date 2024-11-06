<template>
  <div class="main-container">
    <!-- Primeiro container com o título 'Carrinho de compras' -->
    <div class="title-container first-container">
      <h1>Carrinho de compras</h1>
    </div>

    <!-- Segundo container -->
    <div class="title-container custom-container">
      <div class="product-card">
        <!-- Adicione a tag <a> com target="_blank" para abrir a imagem em nova aba -->
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
              <span class="star">&#9733;</span> <!-- Estrela cheia -->
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9734;</span> <!-- Estrela vazia -->
              <span class="star">&#9734;</span>
              <span class="ratings-count">(935 avaliações)</span>
            </div>
            <p class="price">R$ 199,90</p>
          </div>
          <button @click="adicionarAoCarrinho(produtos[0])" class="add-to-cart-button">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>

    <!-- Terceiro container -->
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
            <h3>Placa De Vídeo Gigabyte NVIDIA GeForce <P>RTX 4090 AORUS MASTER, 24GB...</P></h3>
            <div class="rating">
              <span class="star">&#9733;</span> <!-- Estrela cheia -->
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span> <!-- Estrela cheia -->
              <span class="star">&#9734;</span>
              <span class="ratings-count">(128 avaliações)</span>
            </div>
            <p class="price">R$ 13.899,90</p>
          </div>
          <button @click="adicionarAoCarrinho(produtos[1])" class="add-to-cart-button">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>

    <!-- Quarto container -->
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
              <span class="star">&#9733;</span> <!-- Estrela cheia -->
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span>
              <span class="star">&#9733;</span> <!-- Estrela cheia -->
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
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      produtos: [],
      visibleProducts: 3,
      totalProducts: 10
    };
  },
  methods: {
    carregarProdutos() {
      axios.get('http://localhost:3000/produtos')
        .then(response => {
          this.produtos = response.data;
          this.produtos = this.produtos.slice(0, this.visibleProducts);
        })
        .catch(error => console.error(error));
    },
    adicionarAoCarrinho(produto) {
      // Implemente a lógica para adicionar ao carrinho aqui
      console.log("Produto adicionado:", produto.nome);
    }
  },
  mounted() {
    this.carregarProdutos();
  }
}
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
</style>
