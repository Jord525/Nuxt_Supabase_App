<script setup>
const client = useSupabaseAuthClient();
const email = ref("");
const errorMsg = ref(null);
const password = ref("");
const successMsg = ref("");
const singUp = async () => {
  try {
    const { error } = await client.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    successMsg.value = "Проверте ваш email для подтверждения аккаунта";
    if (successMsg.value) {
      errorMsg.value = "";
    }
  } catch (error) {
    console.log(error);
    errorMsg.value = error.message;
  }
};
</script>
<template>
  <form @submit.prevent="() => singUp()">
    <div style="height: 70vh" class="flex justify-center items-center">
      <div class="w-1/4">
        <div class="mb-6">
          <h1 class="text-gray-50 text-xl flex justify-center">Регистрация</h1>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Ваш email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@flowbite.com"
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Ваш пароль</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <p class="text-red-600 mb-3">{{ errorMsg }}</p>
        <p class="text-green-500 text-sm mb-3">{{ successMsg }}</p>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Регистрация
        </button>
        <span class="text-white ml-11 hover:bg-sky-700">
          <NuxtLink to="/login"> Вход </NuxtLink>
        </span>
      </div>
    </div>
  </form>
</template>
