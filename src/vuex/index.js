let Vue;
const forEach = (obj, callback) => {
  Object.keys(obj).forEach((key) => {
    callback(key, obj[key]);
  });
};
// 构建vuex子模块的树状结构
class ModuleCollection {
  constructor(options) {
    this.register([], options);
  }
  //将子模块注册到根模块
  register(pathArr, rootModule) {
    let newModule = {
      _row: rootModule,
      _children: {},
      state: rootModule.state,
    };
    if (!pathArr.length) {
      //  记录根节点
      this.root = newModule;
    } else {
      // console.log(this.root, " this.root");
      const parent = pathArr.slice(0, -1).reduce((root, current) => {
        return root._children[current];
      }, this.root);
      parent._children[pathArr[pathArr.length - 1]] = newModule;
    }
    if (rootModule.modules) {
      forEach(rootModule.modules, (moduleName, module) => {
        //  将模块名称连接
        this.register(pathArr.concat(moduleName), module);
      });
    }
  }
}
//递归安装
/**
 *
 * @param {*} store 当前模块的store
 * @param {*} state  当前state数据（合并所有的state）
 * @param {*} pathArr  当前的模块名称
 * @param {*} rootModule //根模块
 */
const installModule = (store, state, pathArr, rootModule) => {
  // 安装state
  if (pathArr.length) {
    const parent = pathArr.slice(0, -1).reduce((state, current) => {
      return state[current];
    }, state);
    Vue.set(parent, pathArr[pathArr.length - 1], rootModule.state);
    // 根据当前state，找父级的state
  }
  const getters = rootModule._row.getters;
  if (getters) {
    forEach(getters, (getterName, fn) => {
      console.log(getters, store.getters, rootModule.state, "getters----");
      Object.defineProperty(store.getters, getterName, {
        get: () => {
          return fn(rootModule.state);
        },
      });
    });
  }
  const mutations = rootModule._row.mutations;
  if (mutations) {
    //存在同名函数问题，统一存入到一个数组中
    forEach(mutations, (mutationName, fn) => {
      const arr =
        store.mutations[mutationName] || (store.mutations[mutationName] = []);
      arr.push((payload) => {
        fn(rootModule.state, payload);
      });
    });
  }

  let actions = rootModule._row.actions;
  if (actions) {
    forEach(actions, (actionsName, fn) => {
      //存在同名函数问题，统一存入到一个数组中
      const arr =
        store.actions[actionsName] || (store.actions[actionsName] = []);
      arr.push((payload) => {
        fn(store, payload);
      });
    });
  }
  // 递归
  forEach(rootModule._children, (moduleName, module) => {
    installModule(store, state, pathArr.concat(moduleName), module);
  });
};

class Store {
  constructor(options) {
    this.vm = new Vue({
      data: {
        state: options.state,
      },
    });
    this.getters = {};
    this.mutations = {};
    this.actions = {};

    //实例化模块对象，转成树形结构
    this.modules = new ModuleCollection(options);
    // 安装所有模块
    installModule(this, this.state, [], this.modules.root);
  }
  get state() {
    return this.vm.state;
  }

  //这边要改成箭头函数，异步调用commit，this指向为空，需要
  commit = (type, payload) => {
    //将同名的函数统一执行
    this.mutations[type].forEach((fn) => fn(payload));
  };
  dispatch(type, payload) {
    //将同名的函数统一执行
    this.actions[type].forEach((fn) => fn(payload));
  }
}

const install = (_Vue) => {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        this.$store = this.$options.store;
      } else {
        this.$store = this.$parent && this.$parent.$store;
      }
    },
  });
};

export default { install, Store };
