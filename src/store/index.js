// store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    cart: []
  },
  mutations: {
    ADD_TO_CART(state, product) {
      state.cart.push(product);
    },
    CLEAR_CART(state) {
      state.cart = [];
    },
    REMOVE_ITEM(state, productToRemove) {
      // Encontra o índice do produto a ser removido
      const index = state.cart.findIndex(item => item.id === productToRemove.id);
      if (index !== -1) {
        // Remove o item do carrinho
        state.cart.splice(index, 1);
      }
    }
  },
  getters: {
    cartItems: state => state.cart
  }
});