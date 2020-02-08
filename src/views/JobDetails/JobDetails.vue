<template>
  <div class="job-details">
    <div>
      <div>{{ job.title }}</div>
      <div>{{ job.location }}</div>
    </div>
    <div>
      <div>{{ job.company }}</div>
      <div>{{ job.type }}</div>
      <div>{{ job.created_at }}</div>
    </div>

    <!-- TODO: sanitize -->
    <div v-html="job.description"></div>
    <div v-html="job.how_to_apply"></div>
  </div>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      required: true
    }
  }
};
</script>
