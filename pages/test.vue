//
<!-- <script setup>
// const supabase = useSupabaseClient();
// const test = ref([]);
// const countries = ref([]);
// const input = ref("");
// const button = ref(null);
// const name = ref([]);
// async function getCountries() {
//   const { data } = await supabase.from("countries").select("name");
//   countries.value = data;
// }

// const { data: count } = await useFetch("/api/hello");
// test.value = count;
// async function createCountrie(i) {
//   const { data } = await supabase.from("countries").insert({ name: i });
//   input.value = data;
//   getCountries();
// }

// function mapState(i) {
//   name.value[i].classList.add("foo");
// }

// onMounted(() => {
//   getCountries();
// });
// </script>
// <template>
//   <div>
//     <div v-for="printer in test.value.data">
//       {{ printer.name }}
//       {{ printer.amount }}
//     </div>
//     <button
//       ref="button"
//       class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
//     >
//       Сохранить изменения
//     </button>

//     <div class="w-12 m-4">sdfsdf</div>
//     <h1 class="text-3xl font-bold underline">Hello world!</h1>
//     <section>
//       <input type="text" v-model="input" />
//       <button @click="createCountrie(input)">submit</button>
//       <p
//         v-for="(countrie, index) in countries"
//         @click="mapState(index)"
//         ref="name"
//       >
//         {{ countrie.name }} | {{ index }}
//       </p>
//     </section>
//   </div>
// </template>

// <style scopedc>
// .foo {
//   background-color: red;
// }
// p,
// a {
//   color: #f6f4e6;
// }
// </style> -->
<script setup>
definePageMeta({
  middleware: "auth",
});
const nuxtApp = useRuntimeConfig();
const { supabase_name } = nuxtApp.public;
const supabase = useSupabaseClient();
const inputs = ref(
  Array(9)
    .fill()
    .map(() => ({ value: "" }))
);
function delayErroeMsg() {
  setTimeout(() => {
    errorMsg.value = "";
  }, 2000);
}
const labels = ref([
  "Имя",
  "Название",
  "Номер",
  "Работа",
  "Стоимость",
  "Дата оплаты",
  "Номер телефона",
  "Добавлен",
  "Прим",
]);
async function addNewData(value) {
  try {
    const { error } = await supabase.from(supabase_name).insert({
      name: value,
      model_name: value,
      number_printer: value,
      work_name: value,
      amount: value,
      date_payment: value,
      phone_number: value,
      inserted_at: value,
      note: value,
    });
    if (error) throw error;
  } catch (error) {
    errorMsg.value = error.message;
    console.error(error.message);
  }
  value = "";

  if (!errorMsg.value) {
    successMsg.value = "товар добавлен";
    setTimeout(() => {
      successMsg.value = "";
    }, 2000);
  }
}
const successMsg = ref("");
const errorMsg = ref("");
</script>
<template>
  <div>
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
          <span class="text-red-500"
            >{{ errorMsg }} {{ delayErroeMsg() }}
          </span>
        </div>
      </Modal>
      <form class="form" action="" @submit.prevent="addNewData(input.value)">
        <div class="flex flex-col relative m-auto z-0 w-1/2 mb-6 group">
          <input
            v-for="(input, index) in inputs"
            name="floating_name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            :key="index"
            v-model="input.value"
            :placeholder="labels[index]"
          />
          <button
            class="mt-10 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
