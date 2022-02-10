<template>
  <form @submit.prevent="onSubmit">
    <alert-message status="danger" :text='errorMessage' :timeout="5000"/>
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
     <form-input 
      id="confirmPassword" 
      title="Повторите пароль" 
      type='password'
      :validateError="v$.confirmPassword"
      v-model="confirmPassword"
    />
    <!-- {{ $t('vuelidate.minLength', {nowLength: '22', mustLength: '20'})}} -->
    <button type="submit" class="btn btn-primary">Регистрация</button>
  </form>
</template>

<script>
import {mapState} from 'vuex'
import FormInput from '../components/UI/FormInput.vue'
import AlertMessage from "../components/UI/AlertMessage.vue"
import useVuelidate from '@vuelidate/core'
import { required, sameAs, minLength, maxLength, email } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { FormInput, AlertMessage },
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    }
  },
  methods: {
    async onSubmit() {
      //this.$i18n.locale = 'ru'

     const result = await this.v$.$validate()
      if (result) {
         this.$store.dispatch('auth/register', {
          email: this.email,
          password: this.password,
          confirmPassword: this.confirmPassword
        })
      }
    }
  },
  computed: {
     ...mapState({
      errorMessage: state =>  state.auth.error,
  }),
  },
  validations () {
    return {
      email: { required, minLength: minLength(6), maxLength: maxLength(20), email }, // Matches this.firstName
      password: { required, minLength: minLength(6), maxLength: maxLength(20) }, // Matches this.lastName
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