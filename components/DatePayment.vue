<script setup>
const props = defineProps(["printer"]);
const supabase = useSupabaseClient();
const errorMsg = ref("");

async function updataDatePayment(date) {
  const { error } = await supabase
    .from(process.env.SUPABASE_NAME)
    .update({ date_payment: date.date_payment })
    .eq("id", date.id);
  if (error) {
    errorMsg.value = "Введите дату правильно";
    throw error.message;
  } else errorMsg.value = "";
}
function delayErroeMsg() {
  setTimeout(() => {
    errorMsg.value = "";
  }, 2000);
}
</script>
<template>
  <Modal>
    <div
      v-if="errorMsg"
      class="border-2 opacity-60 bg-black flex items-center justify-center absolute text-center rounded-md ml-4 border-sky-900 w-56"
    >
      <span class="text-red-500">{{ errorMsg }} {{ delayErroeMsg() }} </span>
    </div>
  </Modal>
  <input
    v-model="printer.date_payment"
    @keyup.enter="updataDatePayment(printer)"
    class="px-0 w-24 ml-8 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-800 dark:text-gray-200"
  />
</template>
