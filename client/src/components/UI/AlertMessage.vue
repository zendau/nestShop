<template>
  <div :class="'alert alert-'+status" role="alert">
    {{text}}
  </div>
</template>

<script>
export default {
    props: {
        status: {
            validator: function(value) {
                return ['success', 'danger', 'danger'].indexOf(value) !== -1
            },
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true
        } 
    }
}
</script>

<style>

</style>