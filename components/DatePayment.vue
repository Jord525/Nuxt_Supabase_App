<script setup>
const props = defineProps(["printer"]);
const supabase = useSupabaseClient();
const td = ref([]);

async function updataDatePayment(date) {
  const { error } = await supabase
    .from("printer_table")
    .update({ date_payment: date.date_payment })
    .eq("id", date.id);
}
</script>
<template>
  <input
    v-model="printer.date_payment"
    @keyup.enter="updataDatePayment(printer)"
    class="px-0 w-24 ml-8 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
  />
</template>
