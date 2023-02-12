import axios from "axios";

export default ({
  state: {
    items: [],
  },
  getters: {
    GET_ITEMS: (state) => state.items,
  },
  actions: {
    async FETCH_ITEMS({ commit }) {
      alert('ALL IS OK!')
      try {
        const data = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        commit('SET_ITEMS', data.data);
      } catch (error) {
        alert('ERROR... ERROR ... ERROR');
      }
    },
  },
  mutations: {
    SET_ITEMS(state, items) {
      state.items = items;
    },
  },
})