<template>

  <form @submit.prevent="onSubmit">
    <form-input 
      id="login" 
      title="Логин" 
      v-model="login"
    />
    <form-input 
      id="password" 
      title="Пароль" 
      v-model="password"
    />
     <form-input 
      id="password" 
      title="Повторите пароль" 
      v-model="password"
    />
    <button type="submit" class="btn btn-primary">Войти</button>
  </form>

</template>

<script>

import FormInput from '../components/UI/FormInput.vue'

export default {
  components: { FormInput },
  name: "login",
  data() {
    return {
      login: "",
      password: ""
    }
  },
  inject: ['update'],
  methods: {
    onSubmit() {
      this.$store.dispatch("updateStatus", {
        login: this.login,
        password: this.password
      }).then(() => {
        const errorCode = this.$store.state.errorCode
        
        if (errorCode !== 0) {
          this.update(true, errorCode)
          this.$store.commit("updateErrorCode", 0)
        } else {
          this.$router.push("/shop")
        }
      })
    }
  }
}
</script>

<style scoped>
  form {
    width: 600px;
    margin: 100px auto 0;
  }
  .mb-3 {
    display: grid;
    justify-items: baseline;
  }
</style>