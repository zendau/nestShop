<template>
  <form @submit.prevent="onSubmit">
    <alert-message status="danger" :timeout="5000"/>
    <form-input 
      id="email" 
      title="Email" 
      :validateError="v$.email"
      type='email'
      v-model="email"
    />
    <form-input 
      id="password" 
      title="Пароль"
      type='password'
      :validateError="v$.password"
      v-model="password"
    />
    <button type="submit" class="btn btn-primary">Войти</button>
  </form>

</template>

<script>

import FormInput from '../components/UI/FormInput.vue'
import AlertMessage from "../components/UI/AlertMessage.vue"
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength, email } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { FormInput, AlertMessage },
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate()
      console.log(result)
      if (result) {
         this.$store.dispatch('auth/login', {
          email: this.email,
          password: this.password,
        })
      }
    }
  },
  validations () {
    return {
      email: { required, minLength: minLength(6), maxLength: maxLength(20), email },
      password: { required, minLength: minLength(6), maxLength: maxLength(20) },
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