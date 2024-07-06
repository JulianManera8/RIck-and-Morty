<template>
    
    <section class="all-container">

        <div class="search-container">
            <button type="reset" v-if="nameCharacter" @click.prevent="deleteName()"> X </button>
            <input type="text" v-model="nameCharacter" placeholder="Nombre del personaje">
            <button @click.prevent="fetchCharacters()"> Buscar <v-icon name="co-magnifying-glass" /></button>
        </div>

        <div class="cards-container">
            <div class="card" v-for="character in arrFiltered" :key="character.id">
                <div class="card-content">
                    <div class="img-container">
                        <img :src=" character.image " :alt=" character.name " :title="character.name"/>
                    </div>

                    <div class="text-container">
                        <p class="keyText" > Nombre:  <span class="valueText"> {{ character.name }} </span></p>

                        <p class="keyText" > Estado:  <span class="valueText"> {{ character.status }}  </span>
                            <b v-if="character.status === 'Alive'"> 🟢 </b>
                            <b v-else-if="character.status === 'Dead'"> 🔴 </b>
                            <b v-else-if="character.status === 'unknown'"> 🟠 </b>
                        </p>

                        <p class="keyText" > Localizacion:  <span class="valueText"> {{ character.location.name }} </span></p>

                    </div>
                
                </div>
            </div> 
        </div>

    </section>
    
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const arrCharacters = ref([]);
const nameCharacter = ref('');
const arrFiltered = ref([]);

const url = "https://rickandmortyapi.com/api/character/"


function deleteName() {
    nameCharacter.value = '';
    arrFiltered.value = arrCharacters.value;
}

async function fetchCharacters() {

    // fetch(url)
    //     .then((response) => response.json())
    //     .then((data)=> {
    //         arrCharacters.value = data.results
    //     })
    //     .catch((error) => {
    //         console.error(error.message)
    //     })

    try {
        const response = await fetch(url)

        if(!response.ok) {
            console.error('error in the response')
        }

        const data = await response.json();

        arrCharacters.value = data.results
        
        if(nameCharacter.value) {
            
            arrFiltered.value = arrCharacters.value.filter( character => {
                return character.name.toLowerCase().includes(nameCharacter.value.toLowerCase())
            })

        } else {
            arrFiltered.value = arrCharacters.value
        }

    } catch (error) {
        console.error(error.message)
    }
    
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

.all-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;
}

.card {
    background-color: rgb(255, 255, 255);
    width: 300px;
    border-radius: 7%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.102);
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    margin: 10px;
}

.img-container {
    width: 100%;
    margin-top: 3px;

    img {
        width: 100%;
        height: 210px;
        object-fit: cover;
        border-radius: 7%;
    };

}

.text-container { 
    width: 100%;

    .keyText {
        color: rgb(168, 166, 166);
        display: flex;
        align-self: flex-start;
        margin: 7px 0px;
        align-items: baseline;
    };

    .valueText {
        color: black;
        padding: 0px 8px 0px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };

}


</style>