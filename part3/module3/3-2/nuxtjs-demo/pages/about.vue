<template>
  <div>
      <h1>About Page</h1>
      <a href="/">首页-a</a><br />
      <nuxt-link to="/">首页-nuxt-link</nuxt-link><br />
      <button @click="handleClick">首页-js</button>
  </div>
</template>

<script>
export default {
    name:"AhoutPage",
    methods:{
        handleClick(){
            this.$router.push("/")
        }
    }
}
</script>

<style>

</style>