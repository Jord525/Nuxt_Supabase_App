<script setup lang="ts">
const nuxtApp = useRuntimeConfig();
const { supabase_name } = nuxtApp.public;
type printers = {
  id: number;
  amount: number;
  date_payment?: string;
  model_name: string;
  name?: string;
  note?: string;
  number_printer: string;
  phone_number: number;
  work_name: string;
};
const props = defineProps(["printers", "getPrinters"]);
const supabase = useSupabaseClient();
const tr = ref<Array<HTMLElement>>([]);
const tbody = ref<Array<HTMLElement>>([]);
const td = ref<Array<HTMLElement>>([]);

async function deletePrinter(value: printers, i: number) {
  const { error } = await supabase
    .from(supabase_name as string)
    .delete()
    .eq("id", value.id);
  props.getPrinters();
}
onMounted(() => {
  props.getPrinters();
});
</script>
<template>
  <tbody
    ref="tbody"
    v-for="(printer, index) in props.printers.value?.data"
    :key="printer.id"
    class="transition duration-700 translate-x-0 divide-y divide-gray-200 dark:divide-gray-700"
  >
    <tr ref="tr" class="border">
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {{ printer.name }}
      </td>
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {{ printer.model_name }}
      </td>
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {{ printer.number_printer }}
      </td>
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {{ printer.work_name }}
      </td>
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {{ printer.amount }}
      </td>
      <DatePayment :printer="printer" />
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {{ printer.phone_number }}
      </td>
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
      >
        {{ printer.note }}
      </td>
      <DateComponent :dateString="printer.inserted_at" />
      <td
        ref="td"
        class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"
      >
        <a
          class="text-blue-500 hover:text-blue-700 cursor-pointer"
          @click="deletePrinter(printer, index)"
          >Delete</a
        >
      </td>
    </tr>
  </tbody>
</template>
<style>
input {
  background-color: #18181b;
}
</style>
