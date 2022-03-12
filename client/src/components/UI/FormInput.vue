<template>
    <div class="mb-3">
        <label :for="id" class="form-label">{{title}}</label>
        <input  
            :type="type" 
            class="form-control" 
            :id="id" 
            @input="$emit('update:modelValue', $event.target.value)" 
            required 
            :aria-describedby='id+"Help"'
            :value="modelValue"
            :placeholder="title"
            :class="{'is-invalid': validateError?.$error}"
        >
        <div v-if="descHelp !== undefined" :id='id+"Help"' class="form-text">{{descHelp}}</div>
        <div v-if="validateError?.minLength?.$invalid" class="invalid-feedback">This field should be at least {{validateError?.minLength.$params.min}} long, now {{modelValue.length}}</div>
        <div v-if="validateError?.maxLength?.$invalid" class="invalid-feedback">The maximum length allowed is {{validateError?.maxLength.$params.max}}, now {{modelValue.length}}</div>
        <div v-else-if="validateError?.sameAs?.$invalid" class="invalid-feedback">This value must be equal to the password</div>
        <div v-else-if="validateError?.email?.$invalid" class="invalid-feedback">Email is not valid</div>
    </div>
</template>

<script>
export default {
    props: ['title', 'id', 'modelValue', 'descHelp', 'validateError', 'type'],
}
</script>

<style>

</style>