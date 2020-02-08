import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jobs: []
  },

  mutations: {
    setJobs(state, jobs) {
      state.jobs = jobs;
    }
  },

  actions: {
    searchJobs(store, location) {
      store.commit("setJobs", []);

      return axios
        .get("/api/jobs?location=" + location, {
          withCredentials: true
        })
        .then(({ data }) => {
          store.commit("setJobs", data);
          return data;
        });
    },

    fetchJob(store, id) {
      return axios.get("/api/jobs/" + id).then(({ data }) => data);
    }
  }
});
