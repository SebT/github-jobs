<template>
  <app-page class="saved__jobs">
    <template #header> <back-button /></template>

    <div v-if="isFetching" class="txtcenter pts pbs">
      <loader></loader>
    </div>

    <job-list v-else-if="jobs.length" :jobs="jobs"></job-list>

    <div v-else class="block--placeholder">
      You don't have any saved job
    </div>
  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import Loader from "@/components/Loader";
import BackButton from "@/components/BackButton";
import JobList from "@/components/JobList";

export default {
  components: {
    AppPage,
    Loader,
    JobList,
    BackButton
  },

  data() {
    return {
      isFetching: true,
      jobs: []
    };
  },

  async created() {
    // This is bad
    const jobs = await Promise.all(
      this.$store.state.savedJobIds.map(id =>
        this.$store.dispatch("fetchJob", id).catch(error => {
          console.warn("Could not fetch job with id " + id, error);
          return null;
        })
      )
    );

    // Ignored jobs we could not fetch
    this.jobs = jobs.filter(job => !!job);
    this.isFetching = false;
  }
};
</script>
