<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/user">User</router-link> |
    <a href="#" @click="logout">Logout</a>
  </div>
  <slot/>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/')
    }
  }
}
</script>