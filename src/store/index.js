import { createStore } from 'vuex';

export default createStore({
  state: {
    cartItems: []
  },
  mutations: {
    addToCart(state, item) {
      state.cartItems.push(item);
    }
  },
  actions: {
    addToCart({ commit }, item) {
      commit('addToCart', item);
    }
  },
  getters: {
    cartItems: state => state.cartItems
  }
});
