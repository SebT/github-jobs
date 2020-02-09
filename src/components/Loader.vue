<template>
  <div class="loader"></div>
</template>

<style lang="scss">
@import "~knacss/sass/_config/_variables.scss";

.loader {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.loader:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid $gray-800;
  border-color: $gray-800 transparent $gray-800 transparent;
  animation: rotate 1.5s linear infinite;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
