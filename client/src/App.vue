<template>
  <component :is="getLayout">
    <router-view/>
  </component>
  
</template>

<script>

import mainLayout from "./layout/Main.layout.vue"
import authLayout from "./layout/Auth.layout.vue"

export default {
  components: {
    mainLayout
  },
  data() {
    return {
      authStatus: false
    }
  },
  computed: {
    getLayout() {
      return this.authStatus ? authLayout : mainLayout
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
