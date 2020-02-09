<template>
  <div class="app-page">
    <header class="app-page__header">
      <img class="app-page__header-logo" src="@/assets/logo.png" />
      Github jobs
    </header>
    <header class="app-page__sub-header">
      <slot name="header"></slot>
    </header>

    <main class="app-page__main">
      <div class="app-page__main-content">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/_variables.scss";

.app-page__header {
  padding: 1rem 2rem;
  text-align: center;
  background-color: $color-primary;
  color: $white;
  font-size: 1.4em;
  margin-bottom: 1.5rem;
}

.app-page__sub-header,
.app-page__main {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.app-page__header-logo {
  height: 28px;
}

.app-page__sub-header {
  margin-bottom: 1.5rem;
}

.app-page__main-content {
  background-color: $white;
}
</style>
