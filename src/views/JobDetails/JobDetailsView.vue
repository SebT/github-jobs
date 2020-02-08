<template>
  <div class="job-details-view">
    <div v-if="error">
      Could not load job
    </div>

    <loader v-else-if="!job"></loader>

    <job-details v-else :job="job"></job-details>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import JobDetails from "./JobDetails";

export default {
  components: {
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
