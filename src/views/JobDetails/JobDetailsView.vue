<template>
  <app-page class="job-details-view">
    <template #header>
      <button @click="$router.back()">
        <i class="icon-arrow--left"></i>
        Go back
      </button>
    </template>

    <div v-if="error" class="alert--danger">
      Could not load job.
    </div>

    <loader v-else-if="!job"></loader>

    <job-details v-else :job="job"></job-details>
  </app-page>
</template>

<script>
import AppPage from "@/components/AppPage";
import Loader from "@/components/Loader";
import JobDetails from "./JobDetails";

export default {
  components: {
    AppPage,
    Loader,
    JobDetails
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      job: null,
      error: null
    };
  },

  created() {
    const cachedJob = this.$store.state.jobs.find(job => job.id === this.id);
    if (cachedJob) {
      this.job = cachedJob;
    } else {
      this.$store
        .dispatch("fetchJob", this.id)
        .then(job => (this.job = job))
        .catch(error => {
          console.error("Could not fetch job", error);
          this.error = error;
        });
    }
  }
};
</script>
