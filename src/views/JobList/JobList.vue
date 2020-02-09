<template>
  <ul class="job-list">
    <job-list-item v-for="job in jobs" :key="job.id" :job="job"></job-list-item>
  </ul>
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

<style lang="scss">
.job-list {
  padding: 0;
  margin: 0;
}
</style>
