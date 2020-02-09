<template>
  <div class="job-details">
    <h1>{{ job.title }}</h1>
    <section class="job-details__header autogrid">
      <dl class="job-details__attributes col-2">
        <dt>Location</dt>
        <dd>{{ job.location }}</dd>
        <dt>Type</dt>
        <dd>{{ job.type }}</dd>
        <dt>Publication date</dt>
        <dd>{{ job.created_at }}</dd>
      </dl>
      <dl class="job-details__company">
        <dt>Company</dt>
        <dd>
          <div>{{ job.company }}</div>
          <img
            v-if="job.company_logo"
            class="job-details__company-logo"
            :src="job.company_logo"
          />
          <a
            v-if="job.compny_url"
            class="job-details__company-link"
            :href="job.company_url"
          >
            {{ job.company_url }}
          </a>
        </dd>
      </dl>
    </section>

    <div v-html="job.description"></div>

    <h2>How to apply</h2>
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

<style lang="scss">
@import "@/_variables.scss";

.job-details {
  padding: 1rem 2rem;

  h1 {
    font-size: 1.75em;
    margin-bottom: 1.5rem;
  }
}

.job-details__header {
  border-bottom: 2px solid $gray-300;
  margin-bottom: 2rem;
}

.job-details__company-logo {
  max-height: 80px;
  max-width: 80%;
  margin-top: 1rem;
}

.job-details__company-link {
  display: block;
}
</style>
