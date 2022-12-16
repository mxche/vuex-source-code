<template>
  <div id="app">
    <div class="operate-row">
      <div>font:{{ $store.state.font.skills }}</div>

      <div>getters🐻 {{ $store.getters.getCount }}</div>
      <h3>
        🐻state
        <span style="margin-right: 10px">app:{{ count }}</span>
      </h3>
      <h3>
        <span>childApp:{{ childCount }}</span>
      </h3>
      <button @click="handleChangeSkills">修改font</button>
      <button @click="handleAdd">同步增加</button>
      <button @click="handleDecrease">同步减少</button>
      <button @click="handleSyncAdd">异步增加</button>
    </div>
    <div>
      <input type="text" v-model="name" />
      <input type="text" v-model="age" />
      <button @click="handleAddText">添加</button>
    </div>

    <div class="text-row" v-for="item in textArr" :key="item.id">
      <span>{{ item.name }}</span>
      <span>{{ item.age }}</span>
      <button @click="handleDelById(item.id)">删除</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      name: "",
      age: "",
    };
  },
  created() {
    console.log(this.$store, "$store");
  },
  computed: {
    count({ $store }) {
      return $store.state.count;
    },
    childCount({ $store }) {
      return $store.state.font.child.count;
    },
    textArr({ $store }) {
      return $store.state.textArr;
    },
  },
  methods: {
    handleChangeSkills() {
      const skillsObj = {
        5: "I can use typescript and next.js",
        6: "I can use webpack",
        7: "I can use electron",
        8: "I can use react",
      };
      const radomValue = parseInt(Math.random() * 4 + 5);
      this.$store.commit("CHANGE_SKILLS", skillsObj[radomValue]);
    },
    handleAdd() {
      this.$store.commit("ADD_COUNT", 5);
    },
    handleDecrease() {
      this.$store.commit("DECREASE_COUNT", 5);
    },
    handleSyncAdd() {
      this.$store.dispatch("actionsAsyncAddCount", 10);
    },
    handleAddText() {
      const value = {
        name: this.name,
        age: this.age,
        id: this.textArr.length + 1,
      };
      if (!this.name || !this.age) return alert("请填写姓名和年龄");
      this.$store.dispatch("actionsPushTextArr", value);
      this.name = this.age = "";
    },
    handleDelById(id) {
      this.$store.dispatch("actionsDelTextArr", id);
    },
  },
};
</script>

<style>
* {
  padding: 0%;
  margin: 0;
}
#app {
  margin-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.operate-row {
  padding: 10px 0;
}
.operate-row h3 {
  margin-bottom: 20px;
}
button {
  margin: 0 10px;
  padding: 3px 10px;
}
input {
  margin: 3px;
  line-height: 25px;
}
.text-row {
  margin: 0 auto;
  margin: 10px 5px;
  width: 330px;
  display: flex;
  justify-content: space-between;
}
</style>
