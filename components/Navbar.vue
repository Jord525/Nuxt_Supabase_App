<script setup>
const user = useSupabaseUser();
const client = useSupabaseAuthClient();
const router = useRouter();
async function logout() {
  try {
    const { error } = await client.auth.signOut();
    if (error) throw error;
    router.push("/login");
  } catch (error) {
    console.log(error.message);
  }
}
</script>
<template>
  <nav class="navMenu">
    <NuxtLink style="float: left" to="/input">Заказ </NuxtLink>
    <NuxtLink style="float: left" to="/about">Главная</NuxtLink>
    <p style="float: right" class="p" @click="logout">выйти</p>
  </nav>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.navMenu {
  width: 99%;
  height: 3rem;
  line-height: 47px;
  box-shadow: -1px 1px 13px teal;
  margin: 7px 0px 20px 6px;
  border-radius: 10px;
}
p {
  color: #f6f4e6;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  width: 140px;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin: 0 0 0 30px;
  cursor: pointer;
}
.navMenu a {
  color: #f6f4e6;
  text-decoration: none;
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 500;
  display: inline-block;
  width: 140px;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  margin: 0 0 0 30px;
}
.p:hover {
  color: #fddb3a;
}
.navMenu a:hover {
  color: #fddb3a;
}
</style>
