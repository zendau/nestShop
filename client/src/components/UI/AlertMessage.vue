<template>
  <div v-if='errorMessage.length > 0' :class="'alert alert-'+status" role="alert">
    {{errorMessage}}
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    props: {
        status: {
            validator: function(value) {
                return ['success', 'danger', 'danger'].indexOf(value) !== -1
            },
            type: String,
            required: true,
        },
        timeout: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            showAlert: false
        }
    },
    created() {
        console.log('created')
    },
    mounted() {
        console.log('mounted')
    },
    updated() {
        console.log('updated')
        setTimeout(() => {
            console.log(this.$store)
            this.$store.commit('auth/clearErrorMessage')
        }, this.timeout)
    },
        computed: {
     ...mapState({
      errorMessage: state =>  state.auth.error,
  }),
  },
}
</script>

<style>

</style>