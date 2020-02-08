<template>
  <div class="job-list-item">
    <router-link :to="{ name: 'jobDetails', params: { id: job.id } }">
      <div>
        <div>{{ job.title }}</div>
        <div>{{ job.location }}</div>
      </div>
      <div>
        <div>{{ job.company }}</div>
        <div>{{ job.type }}</div>
        <div>{{ job.created_at }}</div>
      </div>
    </router-link>
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
