<script setup>
const supabase = useSupabaseClient();
const test = ref([]);
const countries = ref([]);
const input = ref("");
const button = ref(null);
const name = ref([]);
async function getCountries() {
  const { data } = await supabase.from("countries").select("name");
  countries.value = data;
}

const { data: count } = await useFetch("/api/hello");
test.value = count;
async function createCountrie(i) {
  const { data } = await supabase.from("countries").insert({ name: i });
  input.value = data;
  getCountries();
}

function mapState(i) {
  name.value[i].classList.add("foo");
}

onMounted(() => {
  getCountries();
});
</script>
<template>
  <div>
    <div v-for="printer in test.value.data">
      {{ printer.name }}
      {{ printer.amount }}
    </div>
    <button
      ref="button"
      class="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
    >
      Сохранить изменения
    </button>

    <div class="w-12 m-4">sdfsdf</div>
    <h1 class="text-3xl font-bold underline">Hello world!</h1>
    <section>
      <input type="text" v-model="input" />
      <button @click="createCountrie(input)">submit</button>
      <p
        v-for="(countrie, index) in countries"
        @click="mapState(index)"
        ref="name"
      >
        {{ countrie.name }} | {{ index }}
      </p>
    </section>
  </div>
</template>

<style scopedc>
.foo {
  background-color: red;
}
p,
a {
  color: #f6f4e6;
}
</style>
