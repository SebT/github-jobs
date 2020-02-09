import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const SAVED_JOBS_KEY = "savedJobIds";

export default new Vuex.Store({
  state: {
    searchedLocation: null,
    jobs: [],
    savedJobIds: []
  },

  mutations: {
    setSeachedLocation(state, location) {
      state.searchedLocation = location;
    },
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
    saveJob(state, id) {
      if (!state.savedJobIds.includes(id)) {
        state.savedJobIds.push(id);
      }
    },
    unsaveJob(state, id) {
      const idx = state.savedJobIds.indexOf(id);
      if (idx > -1) {
        state.savedJobIds.splice(idx, 1);
      }
    },
    setSavedJobs(state, savedJobIds) {
      state.savedJobIds = savedJobIds;
    }
  },

  actions: {
    searchJobs(store, location) {
      store.commit("setSeachedLocation", location);
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
    },

    saveJob(store, id) {
      store.commit("saveJob", id);
      persistSavedJobs(store.state.savedJobIds);
    },

    unsaveJob(store, id) {
      store.commit("unsaveJob", id);
      persistSavedJobs(store.state.savedJobIds);
    },

    initSavedJobs(store) {
      const rawIds = localStorage.getItem(SAVED_JOBS_KEY);
      if (rawIds) {
        store.commit("setSavedJobs", JSON.parse(rawIds));
      }
    }
  }
});

function persistSavedJobs(jobIds) {
  localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(jobIds));
}
