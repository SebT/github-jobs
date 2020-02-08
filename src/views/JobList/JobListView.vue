<template>
  <div class="job-list-view">
    <form class="job-list-view__form" @submit.prevent="handleFormSubmit">
      <input v-model="location" placeholder="Job location" />
      <button type="submit">SEARCH</button>
    </form>

    <main class="job-list-view__main">
      <div v-if="isFetching" class="job-list-view__loader">
        <loader></loader>
      </div>

      <job-list v-else :jobs="jobs"></job-list>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Loader from "@/components/Loader";
import JobList from "./JobList";

export default {
  components: {
    JobList,
    Loader
  },

  data() {
    return {
      location: this.$route.query.location,
      isFetching: false
    };
  },

  computed: {
    ...mapState(["jobs"])
  },

  created() {
    // Search jobs on page load if a location is present in the query string
    if (this.location) {
      this.searchJobs();
    }
  },

  methods: {
    handleFormSubmit() {
      this.$router.push({
        name: "jobList",
        query: { location: this.location }
      });
      this.searchJobs();
    },

    searchJobs() {
      this.isFetching = true;

      this.$store
        .dispatch("searchJobs", this.location)
        .catch(error => {
          console.error("Could not fetch jobs", error);
        })
        .then(() => {
          this.isFetching = false;
        });
    }
  }
};
</script>

<style lang="scss">
.job-list-view__loader {
  text-align: center;
  padding: 5rem;
}
</style>
