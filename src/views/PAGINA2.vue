<template>
  <div class="main-container">
    <div class="title-container first-container">
      <h1>Carrinho de compras</h1>
    </div>
    <div v-for="item in cartItems" :key="item.id" class="product-card">
      <!-- Renderize o conteúdo do item aqui -->
    </div>
    <!-- Botões -->
    <div class="buttons-container">
      <button @click="finalizeOrder" class="button finalizar-pedido">Finalizar Pedido</button>
      <button @click="$router.push('/home')" class="button voltar-para-listagem">Voltar para a listagem</button>
      <button @click="clearCart" class="button limpar-carrinho">Limpar carrinho</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    }
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

  .buttons-container {
    width: 45%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .button {     /* Formato padrão dos botões (qualquer alterção vai mexer em todos) */
    width: 338px;
    height: 45px;
    margin: 10px;
    font-size: 16px; 
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .finalizar-pedido {
    background-color: #39115C;
  }

  .voltar-para-listagem {
    width: 500px;
    height: 45px;
  }

  .voltar-para-listagem {
    background-color: #39CC33;
  }

  .limpar-carrinho {
    background-color: #971111;
  }

  .button:hover, .ir-para-carrinho:hover, .limpar-carrinho:hover {
    background-color: #3700b3;
  }
</style>