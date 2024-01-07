<template>
    <div id="backgroundLogged">
        <div id="grid">
            <div id="buttons"></div>
            <Button @click="jugar" class="button_game">JUGAR!</Button>
            <!-- <Button class="button_rooms" disabled>Crear Partida</Button> -->
            <div v-if="users.image" @mouseover="showChangeSkinButton" @mouseleave="hideChangeSkinButton">
                <img :src="users.image" class="icon" >
                <button v-if="showSkinButton" @click="changeSkin" class="change-skin-button">Cambiar Skin</button>
                
                <p class="name">{{ users.username }}</p>
            </div>
            <div class="card flex justify-content-center">
        <Button label="Show" icon="pi pi-external-link" @click="visible = true" />
        <div class="card flex justify-content-center">
            <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
                <p class="mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p> 
            </Dialog>
        </div>
    </div>
    </div>  
    </div>
</template>

<script>
    import { useAppStore } from '../stores/guestStore.js';
    import { socket } from '../socket';
    export default {
        data() {
            return {
                showSkinButton: false,

            };
        }, 
        computed: {
            users() {
                let store = useAppStore();
                return store.getUsers();
            },
        },
        methods: {
            showChangeSkinButton() {
            this.showSkinButton = true;
            },
            hideChangeSkinButton() {
                this.showSkinButton = false;
            },
            changeSkin() {
                // Implementa la lógica para cambiar la skin aquí
                console.log('Cambiando la skin...');
            },
            jugar() {
                socket.emit('join', this.users.username, this.users.image);

                this.$router.push({ path: '/play' });
            },
        }, 
    }
</script>

<style scoped>

#backgroundLogged {
    background-image: url("../assets/loggedView.jpg");
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;

}

/* #grid{
    display: grid;
} */


.button_game {
    position: absolute;
    top: 60%;
    left: 25%;
    transform: translate(-50%, -50%);
    background-image: radial-gradient(#2ecc71, #27ae60); /* Cambiado a verde */
    color: var(--primary-color-text); /* Cambiado a verde */
    font-size: 2rem;
    font-weight: bold;
    border-radius: 1rem;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.button_rooms{
    position: absolute;
    top: 70%;
    left: 25%;
    transform: translate(-50%, -50%);
    background-image: radial-gradient(#2ecc71, #27ae60); /* Cambiado a verde */
    color: var(--primary-color-text); /* Cambiado a verde */
    font-size: 2rem;
    font-weight: bold;
    border-radius: 1rem;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}

.icon{
    display: flex;
    border-radius: 50%;
    width: 12vw;
    right: 25vw;
    top: 40vh;
    position: absolute;
    border: 1px solid black;
    background-color: blanchedalmond;
    margin: 0;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.change-skin-button{
    display: flex;
    width: 6vw;
    right: 28vw;
    top: 55vh;
    background-color: red;
    color: white;
    position: absolute;
    border: 1px solid black;
    margin: 0;
    font-size: 1rem;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.icon:hover {
    opacity: 80%;
}




.name{
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 29vw;
    top: 65vh;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;

}
</style>