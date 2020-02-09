<template>
  <li class="job-list-item">
    <dl class="flex-container">
      <div class="item-fluid">
        <dt>Title</dt>
        <dd class="job-list-item__title">
          <router-link :to="{ name: 'jobDetails', params: { id: job.id } }">{{
            job.title
          }}</router-link>
        </dd>
        <div>
          <dt>Company</dt>
          <dd class="job-list-item__company">{{ job.company }}</dd>
          -
          <dt>Job type</dt>
          <dd class="job-list-item__type">{{ job.type }}</dd>
        </div>
      </div>
      <div class="txtright">
        <dt>Location</dt>
        <dd class="job-list-item__location">{{ job.location }}</dd>
        <dt>Posted on</dt>
        <dd class="job-list-item__created">{{ formattedCreationDate }}</dd>
      </div>
    </dl>
  </li>
</template>

<script>
import { formatDistanceToNow } from "date-fns";

export default {
  props: {
    job: {
      type: Object,
      required: true
    }
  },

  computed: {
    formattedCreationDate() {
      return formatDistanceToNow(new Date(this.job.created_at)) + " ago";
    }
  }
};
</script>

<style lang="scss">
@import "@/_variables.scss";

.job-list-item {
  list-style: none;
  border-bottom: 1px solid $gray-400;
  padding: 1rem 2rem;

  dl,
  dd {
    margin: 0;
  }

  dt {
    display: none;
  }
}

.job-list-item__title a {
  font-weight: 600;
  color: $color-primary;
}
.job-list-item__company,
.job-list-item__type {
  display: inline-block;
}

.job-list-item__created,
.job-list-item__company,
.job-list-item__type {
  color: $gray-600;
}

.job-list-item__company {
  //font-weight: 500;
  color: $gray-700;
}
</style>
