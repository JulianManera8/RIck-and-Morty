<template>
    
    <section class="cards-container">
        <div class="card" v-for="character in arrCharacters" :key="character.id">
            <div class="card-content">
                <img :src=" character.image " :alt=" character.name " :title="character.name"/>

                <p class="keyText" > Nombre: <span class="valueText"> {{ character.name }} </span></p>

                <p class="keyText" > Estado: <span class="valueText"> {{ character.status }}  </span>
                    <b v-if="character.status === 'Alive'"> 🟢 </b>
                    <b v-else-if="character.status === 'Dead'"> 🔴 </b>
                    <b v-else-if="character.status === 'unknown'"> 🟠 </b>
                </p>

                <p class="keyText" > Localizacion: <span class="valueText"> {{ character.location.name }} </span></p>

            </div>
        </div> 
    </section>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';

const arrCharacters = ref([]);

const url = "https://rickandmortyapi.com/api/character/"

function fetchCharacters() {

    fetch(url)
        .then((response) => response.json())
        .then((data)=> {
            arrCharacters.value = data.results
        })
        .catch((error) => {
            console.error(error.message)
        })

    
} 


onMounted( () => {
    fetchCharacters();
})

</script>

<style lang="scss" scoped>

    * {
        box-sizing: content-box;
        margin: 0;
    }

.card {
    background-color: rgb(255, 255, 255);
    width: fit-content;
}

.card-content {
    
}


.keyText {
    color: rgb(168, 166, 166);

    .valueText {
        color: black;
    }
}

img {
    width: 160px;
}

</style>