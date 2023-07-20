<script setup></script>
<template>
  <Transition name="slide-fade">
    <slot />
  </Transition>
</template>
<style>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-60px);
  opacity: 0;
}
</style>
