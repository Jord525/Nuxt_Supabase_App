<script setup lang="ts">
// @ts-ignore@
import Paginate from "vuejs-paginate-next";
definePageMeta({
  middleware: "auth",
});
type searchBy = {
  byDefault: string;
  name: string;
  model: string;
  note: string;
  phone: string;
};
const printers = ref("");
const page = ref<number>(1);
const sort = ref<number>(1);
const search = ref<string>("");
const searchParams = ref<string>("");
const sortSearch = ref<string>("По-умолчанию");
const searchBy = ref<searchBy>({
  byDefault: "По-умолчанию",
  name: "Имя",
  model: "Модель",
  note: "Примечание",
  phone: "Номер",
});
const selectedOption = ref("");

async function getAll() {
  const { data: count } = await useFetch(
    `/api/printers?page=${page.value}&asc=${sort.value}&search=${search.value}&searchParams=${searchParams.value}`
  );
  printers.value = count as any;
}
async function pageNumber(pageNum: number) {
  (page.value = pageNum), getAll();
}
function selectColumnSearch() {
  if (sortSearch.value === "Имя") {
    searchParams.value = "name";
  } else if (sortSearch.value === "Модель") {
    searchParams.value = "model_name";
  } else if (sortSearch.value === "Примечание") {
    searchParams.value = "note";
  } else if (sortSearch.value === "Номер") {
    searchParams.value = "number_printer";
  } else if (sortSearch.value === "По-умолчанию") {
    searchParams.value = "";
    search.value = "";
    getAll();
  }
}
function updateSelectedOption(value: string) {
  const select = (selectedOption.value = value);
  if (select === "Я-А") {
    sort.value = 0;
    getAll();
  } else if (select === "А-Я") {
    sort.value = 1;
    getAll();
  }
}
onMounted(() => {
  getAll();
});
</script>
<template>
  <div class="flex flex-col">
    <Navbar />
    <div class="flex">
      <Selected
        :sort="sort"
        :getAll="getAll"
        @child-event="updateSelectedOption"
        class="w-52"
      />
      <div class="flex">
        <select
          v-model="sortSearch"
          @change="selectColumnSearch()"
          id="states-button"
          data-dropdown-toggle="dropdown-states"
          class="flex-shrink-0 ml-5 h-10 z-10 inline-flex items-center py-2.5 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        >
          <option v-for="a in searchBy">
            {{ a }}
          </option>
        </select>

        <input
          v-model="search"
          @keyup.enter="getAll()"
          placeholder="поиск"
          id="states"
          class="bg-gray-50 border h-10 border-gray-300 text-gray-900 text-sm rounded-r-lg border-l-gray-100 dark:border-l-gray-700 border-l-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
    <div class="overflow-x-auto">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-auto" style="height: 74vh">
          <table
            class="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
          >
            <TableHead />
            <Tbody :getPrinters="getAll" :printers="printers" />
          </table>
        </div>
        <paginate
          :page-count="+printers.value?.totalPage"
          :click-handler="pageNumber"
          :prev-text="'Prev'"
          :next-text="'Next'"
          active-class="active-class"
          :container-class="'inline-flex ml-3 items-center -space-x-px'"
          page-class="  px-3 py-2 cursor-pointer leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          prev-class=" active block cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          next-class="block cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
        </paginate>
      </div>
    </div>
  </div>
</template>
<style>
.active-class {
  color: #fddb3a;
}
</style>
