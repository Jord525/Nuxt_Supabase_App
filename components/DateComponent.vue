<script setup>
const props = defineProps(["dateString"]);
const formattedDate = computed(() => {
  let date_object = new Date(props.dateString);
  let formatted_date =
    date_object.getFullYear() +
    "." +
    ("0" + (date_object.getMonth() + 1)).slice(-2) +
    "." +
    ("0" + date_object.getDate()).slice(-2) +
    " " +
    ("0" + date_object.getHours()).slice(-2) +
    ":" +
    ("0" + date_object.getMinutes()).slice(-2);
  return formatted_date;
});
</script>
<template>
  <td
    ref="td"
    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200"
  >
    {{ formattedDate }}
  </td>
</template>
