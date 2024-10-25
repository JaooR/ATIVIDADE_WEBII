<template>
  <div class="main-container">
    <!-- Primeiro container com o título 'Carrinho de compras' -->
    <div class="title-container first-container">
      <h1>Carrinho de compras</h1>
    </div>

    <!-- Segundo container -->
    <div class="title-container">
      <h1></h1>
    </div>

    <!-- Terceiro container -->
    <div class="title-container">
      <h1></h1>
    </div>

    <!-- Quarto container  -->
    <div class="title-container">
      <h1></h1>
    </div>

    <!-- Continuação do layout para produtos e botões -->
    <div v-for="produto in produtos" :key="produto.id" class="product-container">
      <div class="product-card">
        <img :src="require('@/assets/' + produto.foto)" :alt="produto.nome" class="product-image"/>
        <div class="product-info">
          <h3>{{ produto.nome }}</h3>
          <p>{{ produto.avaliacao }} Estrelas ({{ produto.totalAvaliacoes }} avaliações)</p>
          <p>R$ {{ produto.preco }}</p>
          <button @click="adicionarAoCarrinho(produto)">Adicionar ao carrinho</button>
        </div>
      </div>
    </div>

    <div class="buttons-container">
      <button @click="carregarMaisProdutos" class="button">Carregar mais produtos</button>
      <button @click="irParaCarrinho" class="button ir-para-carrinho">Ir para o carrinho</button>
    </div>
  </div>
</template>




<script>
import axios from 'axios';

export default {
  data() {
    return {
      produtos: []
    }
  },
  methods: {
    carregarProdutos() {
      axios.get('http://localhost:3000/produtos')
        .then(response => {
          this.produtos = response.data;
        })
        .catch(error => console.error(error));
    },
    adicionarAoCarrinho(produto) {
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    },
    carregarMaisProdutos() {
      // Implementar a lógica para carregar mais produtos, se necessário
    },
    irParaCarrinho() {
      // Redirecionamento ou outra lógica aqui
      console.log("Redirecionando para o carrinho...");
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
  align-items: center; /* Mantém os itens alinhados ao centro horizontalmente */
  justify-content: center; /* Adiciona centralização no eixo horizontal */
  width: 100%; /* A largura máxima para ocupar toda a largura disponível */
}

.title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Centraliza o conteúdo verticalmente */
  width: 938px; /* Largura especificada */
  height: 179px; /* Altura especificada */
  background-color: #23242C;
  border: -1px solid #23242C;
  margin-bottom: 2px; /* Espaço reduzido entre containers */
}

h1 {
  font-family: 'Inter', sans-serif;
  font-size: 19px;
  font-weight: 700;
  line-height: 24px;
  text-align: center; /* Alinhamento central para o título */
  color: white;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}

.button, .ir-para-carrinho {
  width: 338px;
  height: 57px;
  margin: 10px;
  font-size: 21px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #6200ea; /* Restaura a cor inicial dos botões */
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

.first-container {
  width: 938px; /* Reduz a largura do primeiro container */
  height: 57px; /* Reduz a altura do primeiro container */
  margin-bottom: 2px; /* Ajusta o espaçamento se necessário */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
</style>










