<template>
  <app-page class="job-list-view">
    <template #header>
      <div class="flex-container">
        <form
          class="job-list-view__form item-fluid"
          @submit.prevent="handleFormSubmit"
        >
          <label class="job-list-view__form-label">
            <span>Search by location :</span>
            <input
              v-model="location"
              class="job-list-view__form-input"
              placeholder="Job location"
            />
          </label>
          <button
            :disabled="isFetching || !location"
            class="btn--primary job-list-view__form-button"
            type="submit"
          >
            <i class="fas fa-search-location"></i>
          </button>
        </form>

        <router-link class="btn" :to="{ name: 'savedJobs' }">
          <i class="fas fa-star"></i>
          See saved jobs
        </router-link>
      </div>
    </template>

    <section class="job-list-view__main">
      <div v-if="isFetching" class="job-list-view__loader">
        <loader></loader>
      </div>

      <div v-else-if="error" class="alert--danger">
        An error happened.
      </div>

      <job-list
        v-else-if="$store.state.jobs.length"
        :jobs="$store.state.jobs"
      ></job-list>

      <template v-else>
        <div
          v-if="$store.state.searchedLocation"
          class="job-list-view__no-result block--placeholder"
        >
          No jobs found in <em>{{ $store.state.searchedLocation }}</em>
        </div>
        <div v-else class="job-list-view__placeholder block--placeholder">
          Please, input a location to search for jobs.
        </div>
      </template>
    </section>
  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import Loader from "@/components/Loader";
import JobList from "@/components/JobList";

export default {
  components: {
    AppPage,
    Loader,
    JobList
  },

  data() {
    return {
      location: this.$store.state.searchedLocation || "",
      isFetching: false,
      error: null
    };
  },

  created() {
    // Search jobs on page load if a location is present in the query string
    if (this.$route.query.location) {
      this.location = this.$route.query.location;
      this.searchJobs();
    }
  },

  methods: {
    handleFormSubmit() {
      if (this.location !== this.$route.query.location) {
        this.$router.push({
          name: "jobList",
          query: { location: this.location }
        });
        this.searchJobs();
      }
    },

    searchJobs() {
      if (this.location === this.$store.state.searchedLocation) {
        return;
      }

      this.isFetching = true;
      this.error = null;

      this.$store
        .dispatch("searchJobs", this.location)
        .catch(error => {
          console.error("Could not fetch jobs", error);
          this.error = error;
        })
        .then(() => {
          this.isFetching = false;
        });
    }
  }
};
</script>

<style lang="scss">
.job-list-view__form-input,
.job-list-view__form-button {
  height: 3.5rem;
  vertical-align: middle;
}

.job-list-view__form-label {
  font-weight: 600;
  padding-left: 2rem;

  span {
    margin-right: 2rem;
  }
}

.job-list-view__form-input {
  padding: 0 1rem;
}

.job-list-view__form-button {
  padding: 0.5rem 1.5rem;
}

.job-list-view__loader {
  text-align: center;
  padding: 5rem;
}
</style>
