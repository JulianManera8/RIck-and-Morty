<template>
    <div>
        <h1>RICK AND MORTY API</h1>
    </div>

    <div>
        <Characters />
    </div>


</template>

<script setup>
import Characters from './Characters.vue'

</script>

<style lang="scss" scoped>

@import url('https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap');

* {
    color: black;
    display: flex;
    justify-content: center;
}


h1 {
    font-family: 'Passion One', monospace;
    font-weight: 900;
    color: #333333;
    font-size: clamp(2rem, 6vw, 4rem);
    text-align: center;
}

</style>