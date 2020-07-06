import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./module/User";

import { Notify } from "quasar";
Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [createPersistedState()],
    modules: {
      user
    },
    state: {
      loginDialog: false,
      sideBar: false
    },
    getters: {
      getLogin: state => {
        return state.loginDialog;
      },
      getSideBar: state => {
        return state.sideBar;
      }
    },
    mutations: {
      setLogin: (state, payload) => {
        state.loginDialog = payload;
      },
      setSideBar: (state, payload) => {
        state.sideBar = payload;
      }
    },
    actions: {
      showAlert: ({}, msg) => {
        Notify.create({
          color: "red",
          message: msg
        });
      },
      showInfo: ({}, msg) => {
        Notify.create({
          color: "green",
          message: msg
        });
      }
    }
  });

  return Store;
}
