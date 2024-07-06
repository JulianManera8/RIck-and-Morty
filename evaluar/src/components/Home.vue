<template>
    <div>
        <h1>RICK AND MORTY API</h1>
    </div>

    <Searchbar />

    <div>
        <Characters />
    </div>


</template>

<script setup>
import Searchbar from './Searchbar.vue'
import Characters from './Characters.vue'



</script>

<style lang="scss" scoped>
* {
    color: black;
}
</style>