<template>
  <form @submit.prevent="onSubmit">
    <alert-message v-if="errorMessage" status="danger" :text='errorMessage'/>
    <form-input 
      id="login" 
      title="Логин" 
      :validateError="v$.login"
      v-model="login"
    />
    <form-input 
      id="password" 
      title="Пароль"
      :validateError="v$.password"
      v-model="password"
    />
     <form-input 
      id="password" 
      title="Повторите пароль" 
      :validateError="v$.confirmPassword"
      v-model="confirmPassword"
    />
    <button type="submit" class="btn btn-primary">Регистрация</button>

  </form>
</template>

<script>

import FormInput from '../components/UI/FormInput.vue'
import AlertMessage from "../components/UI/AlertMessage.vue"

import useVuelidate from '@vuelidate/core'
import { required, sameAs, minLength, maxLength } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { FormInput, AlertMessage },
  name: "login",
  data() {
    return {
      login: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    }
  },
  inject: ['update'],
  methods: {
    async onSubmit() {
      // this.$store.dispatch("updateStatus", {
      //   login: this.login,
      //   password: this.password
      // }).then(() => {
      //   const errorCode = this.$store.state.errorCode
        
      //   if (errorCode !== 0) {
      //     this.update(true, errorCode)
      //     this.$store.commit("updateErrorCode", 0)
      //   } else {
      //     this.$router.push("/shop")
      //   }
      // })
     const result = await this.v$.$validate()
      if (result) {
        console.log('ok')
        this.errorMessage = 'Данный email уже занят'
        setTimeout(() => this.errorMessage = '', 2000)
      }
    }
  },
  validations () {
    return {
      login: { required, minLength: minLength(4), maxLength: maxLength(20) }, // Matches this.firstName
      password: { required, minLength: minLength(4), maxLength: maxLength(20) }, // Matches this.lastName
      confirmPassword: {
        sameAs: sameAs(this.password)
      }
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