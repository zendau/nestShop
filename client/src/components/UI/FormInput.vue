<template>
    <div class="mb-3">
        <label :for="id" class="form-label">{{title}}</label>
        <input  
            type="text" 
            class="form-control" 
            :id="id" 
            @input="$emit('update:modelValue', $event.target.value)" 
            required 
            :aria-describedby='id+"Help"'
            :value="modelValue"
            :placeholder="title"
        >
        <div v-if="descHelp !== undefined" :id='id+"Help"' class="form-text">{{descHelp}}</div>
    </div>
</template>

<script>
export default {
    props: ['title', 'id', 'modelValue', 'descHelp'],
}
</script>

<style>

</style>