import child from "./childApp";

const state = {
  skills: "vue.js",
};

const mutations = {
  CHANGE_SKILLS(state, value) {
    state.skills = value;
  },
};

export default {
  state,
  mutations,
  modules: {
    child,
  },
};
