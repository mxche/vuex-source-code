// import child from "./childApp";
const state = {
  count: 0,
  input: "hello vuex",
  textArr: [{ id: 0, name: "张三", age: 20 }],
};
const getters = {
  getCount(state) {
    return state.count;
  },
};
const mutations = {
  ADD_COUNT(state, value) {
    state.count += value;
  },
  DECREASE_COUNT(state, value) {
    state.count -= value;
  },
  PUSH_TEXT_ARR(state, value) {
    state.textArr.push(value);
  },

  DEL_TEXT_ARR(state, id) {
    const textIndex = state.textArr.findIndex((item) => item.id === id);
    if (textIndex > -1) {
      state.textArr.splice(textIndex, 1);
    }
  },
};
const actions = {
  actionsAsyncAddCount({ commit }, value) {
    setTimeout(() => {
      commit("ADD_COUNT", value);
    }, 1000);
  },
  actionsPushTextArr({ commit }, value) {
    commit("PUSH_TEXT_ARR", value);
  },
  actionsDelTextArr({ commit }, id) {
    commit("DEL_TEXT_ARR", id);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
  // modules: { child },
};
