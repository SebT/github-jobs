<template>
  <div class="job-list">
    <job-list-item v-for="job in jobs" :key="job.id" :job="job"></job-list-item>
  </div>
</template>

<script>
import JobListItem from "./JobListItem";

export default {
  components: {
    JobListItem
  },

  props: {
    jobs: {
      type: Array,
      required: true
    }
  }
};
</script>
