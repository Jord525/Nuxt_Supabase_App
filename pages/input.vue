<script setup>
definePageMeta({
  middleware: "auth",
});
const nuxtApp = useRuntimeConfig();
const { supabase_name } = nuxtApp.public;
const supabase = useSupabaseClient();
const allValue = ref({
  name: "",
  phone_Number: "",
  model_Name: "",
  work: "",
  amount: "",
  date: "",
  printer_number: "",
  prim: "",
  data_reg: "",
});
const successMsg = ref("");
const errorMsg = ref("");

async function addNewData(value) {
  try {
    const { error } = await supabase.from(supabase_name).insert({
      name: value.name,
      model_name: value.model_Name,
      number_printer: value.printer_number,
      work_name: value.work,
      amount: value.amount,
      date_payment: value.date,
      phone_number: value.phone_Number,
      inserted_at: value.data_reg,
      note: value.prim,
    });
    if (error) throw error;
  } catch (error) {
    errorMsg.value = error.message;
    console.error(error.message);
  }
  allValue.value.name = "";
  allValue.value.phone_Number = "";
  allValue.value.amount = "";
  allValue.value.date = "";
  allValue.value.prim = "";
  allValue.value.printer_number = "";
  allValue.value.work = "";
  allValue.value.model_Name = "";
  if (!errorMsg.value) {
    successMsg.value = "товар добавлен";
    setTimeout(() => {
      successMsg.value = "";
    }, 2000);
  }
}

function delayErroeMsg() {
  setTimeout(() => {
    errorMsg.value = "";
  }, 2000);
}
</script>

<template>
  <div class="div_form">
    <Navbar />
    <Modal>
      <div
        v-if="successMsg"
        class="border-2 opacity-60 bg-black flex items-center justify-center h-10 absolute text-center rounded-md ml-4 border-sky-900 w-56"
      >
        <span class="text-green-500">{{ successMsg }}</span>
      </div>
      <div
        v-else-if="errorMsg"
        class="border-2 opacity-60 bg-black flex items-center justify-center h-full absolute text-center rounded-md ml-4 border-sky-900 w-56"
      >
        <span class="text-red-500">{{ errorMsg }} {{ delayErroeMsg() }} </span>
      </div>
    </Modal>
    <form class="form" action="" @submit.prevent="addNewData(allValue)">
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          name="floating_name"
          v-model="allValue.name"
          class="block py-2.5 mt-4 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="text"
          id="floating_name"
        />
        <label
          for="floating_name"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-6 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Имя</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          name="floating_model"
          id="floating_model"
          v-model="allValue.model_Name"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="text"
        />
        <label
          for="floating_model"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Модель</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          name="floating_number"
          id="floating_number"
          v-model="allValue.printer_number"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="number"
        />
        <label
          for="floating_number"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Номер</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          name="floating_work"
          id="floating_work"
          v-model="allValue.work"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="text"
        />
        <label
          for="floating_work"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Работа</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          name="floating_amount"
          id="floating_amount"
          v-model="allValue.amount"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="number"
        />
        <label
          for="floating_amount"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Сумма</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          v-model="allValue.date"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="date"
          name="floating_date"
          id="floating_date"
        />

        <label
          for="floating_date"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Дата оплаты</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          v-model="allValue.data_reg"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="date"
          name="date_ref"
          id="date_ref"
        />

        <label
          for="date_ref"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Дата регистрации</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          v-model="allValue.phone_Number"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          type="tel"
          name="floating_phone"
          id="floating_phone"
        />
        <label
          for="floating_phone"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Номер телефона</label
        >
      </div>
      <div class="relative z-0 w-11/12 mb-6 group">
        <input
          v-model="allValue.prim"
          type="text"
          name="floating_prim"
          id="floating_prim"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          for="floating_prim"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Примечание</label
        >
      </div>
      <button
        class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Отправить
      </button>
    </form>
  </div>
</template>
<style scoped>
label {
  color: #f6f4e6;
}

.form {
  width: 28%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  box-shadow: -1px 1px 13px teal;
  border-radius: 10px;
  align-content: center;
  flex-wrap: wrap;
}

.form input:focus {
  outline: none;
}
</style>
