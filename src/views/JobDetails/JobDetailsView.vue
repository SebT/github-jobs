<template>
  <app-page class="job-details-view">
    <template #header>
      <div class="clearfix">
        <back-button class="fl" />
        <button
          v-if="job"
          class="fr btn"
          @click="isSaved ? unsaveJob(job.id) : saveJob(job.id)"
        >
          <template v-if="isSaved">
            <i class="fas fa-star"></i>
            Unsave job
          </template>
          <template v-else>
            <i class="far fa-star"></i>
            Save job
          </template>
        </button>
      </div>
    </template>
    <div v-if="error" class="alert--danger">
      Could not load job.
    </div>

    <loader v-else-if="!job"></loader>

    <job-details v-else :job="job"></job-details>
  </app-page>
</template>

<script>
import { mapActions } from "vuex";
import AppPage from "@/components/AppPage";
import Loader from "@/components/Loader";
import BackButton from "@/components/BackButton";
import JobDetails from "./JobDetails";

export default {
  components: {
    AppPage,
    Loader,
    BackButton,
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
  },

  methods: mapActions(["saveJob", "unsaveJob"]),

  computed: {
    isSaved() {
      return this.$store.state.savedJobIds.indexOf(this.job.id) > -1;
    }
  }
};
</script>
