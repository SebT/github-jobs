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

.block--placeholder {
  padding: 2rem 0;
  text-align: center;
  font-size: 1.3em;
  font-weight: 300;
}
</style>
