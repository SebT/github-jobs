<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "~knacss/sass/knacss.scss";
@import "@/_variables";

body {
  background-color: $gray-100;
}

.fa-star {
  color: $color-star;
}
</style>
