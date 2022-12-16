const state = {
  count: 0,
};
const mutations = {
  ADD_COUNT(state, value) {
    state.count += value + 5;
  },
  DECREASE_COUNT(state, value) {
    state.count -= value;
  },
};

export default {
  state,
  mutations,
};
