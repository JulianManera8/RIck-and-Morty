<template>
    
    <section class="all-container">

        <div class="search-container">
            <button class="btn-delete" v-if="nameCharacter" @click.prevent="deleteName()"> X </button>
            <input class="input" type="text" v-model="nameCharacter" placeholder="Nombre del personaje">
            <button class="btn-search" @click.prevent="fetchCharacters()"> Buscar <v-icon name="co-magnifying-glass" scale="1.4"/></button>
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
import { ref, onMounted } from 'vue';

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

@import url('https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap');

* {
    box-sizing: content-box;
    margin: 0;
}

.all-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90vw;
    margin-bottom: 100px;
}

.search-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .input {
        width: 70%;
        height: 12px;
        padding: 10px 25px;
        margin: 0px 25px 0 10px;
        font-size: 65%;
        border-radius: 0.7rem;
        border: 1px solid rgb(203, 203, 203);
        color: rgb(104, 104, 104);
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    .btn-search {
        background-color: rgb(64, 0, 137);
        color: white;
        display: flex;
        align-items: center;
        justify-content: space-evenly;   
        gap: 5px;    
        padding: 10px 20px;
        margin-right: 15px;
        border-radius: 1rem;
        height: 13px;
        width: 60px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 50%;
        cursor: pointer;
        border: none;
    }

    .btn-delete {
        background-color: rgba(56, 0, 120, 0.459);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;    
        padding: 10px;
        border-radius: 50%;
        width: 4px;
        height: 4px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        font-size: 2px;
        cursor: pointer;
        border: none;
    }

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
    width: 250px;
    height: 285px;;
    border-radius: 7%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.102);
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 10px;
}

.img-container {
    width: 100%;
    img {
        width: 100%;
        height: 180px !important;
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
        margin: 7px 0px 0px 0px;
        align-items: baseline;
        font-size: clamp(0.2rem, 0.5vw, .5rem);
    };

    .valueText {
        color: rgb(55, 55, 55);
        padding: 0px 8px 0px 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    };

}


</style>