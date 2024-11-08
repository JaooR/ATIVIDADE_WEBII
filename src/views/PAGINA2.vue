<template>
  <div class="main-container">
    <div class="title-container first-container">
      <h1 class="title-text">Carrinho de compras</h1>
    </div>

    <div v-for="item in cartItems" :key="item.id" class="product-card">
      <img :src="item.imagem" alt="Foto do produto" class="product-image" />
<div class="product-details">
  <h3>
    <span v-if="item.nome.includes('RTX 4090 AORUS MASTER')">
      Placa De Vídeo Gigabyte NVIDIA GeForce <br />
      RTX 4090 AORUS MASTER, 24GB
    </span>
    <span v-else>{{ item.nome }}</span>
  </h3>
  <div class="rating">
    <span class="star">&#9733;&#9733;&#9733;&#9734;&#9734;</span>
    <span class="ratings-count">(935 avaliações)</span>
  </div>
  <p class="price">R$ {{ item.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
</div>
      <div
        :class="[ 'quantity-controls', item.nome.includes('RTX 4090 AORUS MASTER') ? 'adjusted-controls' : '', item.nome.includes('Teclado Logitech Silent Touch') ? 'adjusted-keyboard-controls' : '' ]">
        <button @click="increaseQuantity(item)">&#43;</button>
        <span>{{ item.quantidade }}</span>
        <button @click="decreaseQuantity(item)">&#8722;</button>
      </div>

      <div class="subtotal" :class="{ 'adjusted-subtotal': item.nome.includes('RTX 4090 AORUS MASTER') }">
        <p>Subtotal</p>
        <p>R$ {{ (item.preco * item.quantidade).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</p>
      </div>
    </div>

    <!-- Container para exibir o total -->
    <div class="total-container">
      <span class="total-label">Total</span>
      <span class="total-amount">R$ {{ totalCarrinho.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
    </div>

    <!-- Botões -->
    <div class="buttons-container">
      <button @click="openModal" class="button finalizar-pedido">Finalizar Pedido</button>
      <button @click="$router.push('/home')" class="button voltar-para-listagem">Voltar para a listagem</button>
      <button @click="clearCartAndRedirect" class="button limpar-carrinho">Limpar carrinho</button>
    </div>

    <!-- Popup Modal de Finalização de Pedido -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <button @click="closeModal" class="close-button">&times;</button>
        <h2>Sucesso!</h2>
        <hr class="modal-divider">
        <p>Seu pedido foi aceito! Em instantes você receberá um e-mail de confirmação com o código de rastreamento para a sua entrega.</p>
        <button @click="confirmOrder" class="ok-button">&#10003; OK</button>
      </div>
    </div>

    <!-- Popup Modal de Confirmação de Remoção -->
    <div v-if="isRemoveConfirmOpen" class="modal">
      <div class="modal-content">
        <button @click="closeRemoveConfirm" class="close-button">&times;</button>
        <h2>Aviso!</h2>
        <hr class="modal-divider">
        <p>Você está prestes a remover esse item do carrinho. Você tem certeza que deseja prosseguir?</p>
        <button @click="removeItemConfirmed" class="ok-button">✔ Sim</button>
        <button @click="closeRemoveConfirm" class="cancel-button">X Não</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isModalOpen: false,
      isRemoveConfirmOpen: false,
      itemToRemove: null
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    totalCarrinho() {
      return this.cartItems.reduce((total, item) => total + item.preco * item.quantidade, 0);
    }
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    confirmOrder() {
      this.$store.commit('CLEAR_CART'); // Limpa o carrinho
      this.isModalOpen = false;
      this.$router.push('/home'); // Redireciona para a página inicial
    },
    clearCartAndRedirect() {
      this.$store.commit('CLEAR_CART');
      this.$router.push('/home'); // Redireciona para a página Home após limpar o carrinho
    },
    increaseQuantity(item) {
      item.quantidade++;
    },
    decreaseQuantity(item) {
      if (item.quantidade === 1) {
        this.isRemoveConfirmOpen = true;
        this.itemToRemove = item; // Armazena o item a ser removido para confirmação
      } else {
        item.quantidade--;
      }
    },
    closeRemoveConfirm() {
      this.isRemoveConfirmOpen = false;
      this.itemToRemove = null;
    },
    removeItemConfirmed() {
      if (this.itemToRemove) {
        this.$store.commit('REMOVE_ITEM', this.itemToRemove);
      }
      this.closeRemoveConfirm();
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
  height: 50px;
  display: flex;
  align-items: center;
  background-color: #23242C;
  padding: 10px;
  margin: 0px;
}

.title-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: white;
  margin: 0;
  margin-left: 20px; /* Ajuste para posicionar o texto à esquerda */
}

.first-container {
  width: 660.7px; /* Largura ajustada para alinhar com os produtos */
  height: 29px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-card {
  display: flex;
  align-items: center;
  background-color: #23242C;
  padding: 10px;
  height: 110px;
  width: 660.70px;
  margin: 1px 0;
}
.product-image {
  width: 90px;
  height: 80px;
  border-radius: 6px;
  margin-right: 15px;
}

.product-details {
  font-family: 'Inter', sans-serif;
  margin-top: 40px; /* Ajuste o valor conforme necessário */
  flex: 2;
  color: white;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

h3 {
  font-size: 12px;
  margin: 0;
  font-weight: normal;
}

.rating {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #ffae00;
  margin: 0;
}

.ratings-count {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #646464;
  margin-left: 5px;
}

.price {
  font-family: 'Inter', sans-serif;
  font-size: 29px;
  color: #a33aff;
  margin-top: 10px;
}

.quantity-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; /* Ajusta o espaçamento entre os elementos */
  margin-right: 100px;
}

.adjusted-controls {
  margin-right: 89px; /* Ajuste específico para o produto RTX 4090 */
}

.adjusted-keyboard-controls {
  margin-right: 80px; /* Ajuste específico para o produto Teclado Logitech Silent Touch */
}

.quantity-controls button {
  background-color: #23242C;
  border: 1px solid #646464;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.quantity-controls span {
  font-size: 16px;
  color: white;
  margin: 0; /* Remove qualquer margem */
  padding: 0; /* Remove qualquer padding */
  text-align: center; /* Centraliza o número */
}

.subtotal {
  font-family: 'Inter', sans-serif;
  color: #a33aff;
  font-size: 29px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 40px;
  min-width: 90px; /* Define uma largura mínima para alinhar */
}

.subtotal p {
  margin: 0;
}

.subtotal p:first-child {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #FFFFFF;
  text-align: left;
  margin-right: 60px;
}

.adjusted-subtotal p:last-child {
  margin-right: -50px; /* Ajuste para mover o valor para a direita */
}

.total-container {
  font-family: 'Inter', sans-serif;
  display: flex;
  justify-content: space-between;
  background-color: #23242C;
  width: 660.70px;
  padding: 10px;
  color: white;
  font-size: 18px;
  margin-top: 10px 0;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.total-label {
  margin-right: 10px;
  margin-left: auto;
  font-family: 'Inter', sans-serif;
}

.total-amount {
  font-family: 'Inter', sans-serif;
  color: #a33aff;
  font-size: 20px;
}

.buttons-container {
  width: 45%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button {
  width: 338px;
  height: 45px;
  margin: 10px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #39115C;
}

.finalizar-pedido {
  background-color: #6200ea;
}

.voltar-para-listagem {
  background-color: #39cc33;
}

.limpar-carrinho {
  background-color: #971111;
}

.button:hover {
  background-color: #3700b3;
}

.voltar-para-listagem:hover {
  background-color: #2e9929;
}

.modal {
  font-family: 'Inter', sans-serif;
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
  text-align: left; /* Alinhamento geral do texto */
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
  padding: 8px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  float: right; /* Alinhamento do botão à direita */
}

.cancel-button {
  background-color: #971111;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 315px;
}
</style>
