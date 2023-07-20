<script setup>
const props = defineProps(["sort", "getAll"]);
const options = ref({
  asc: "А-Я",
  desc: "Я-А",
});
const selectedValue = ref("");
const emit = defineEmits(["child-event"]);

function emitEvent() {
  emit("child-event", selectedValue.value);
}
</script>
<template>
  <select
    v-model="selectedValue"
    @change="emitEvent"
    class="block h-10 p-2 mb-1 ml-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option disabled value="">Сортировать по:</option>
    <option v-for="option in options">{{ option }}</option>
  </select>
</template>
