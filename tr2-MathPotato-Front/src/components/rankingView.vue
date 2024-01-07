<template>
    <div>
        <div id="background_page" class="flex flex-row justify-content-between h-100vh">
            <!-- Logo a la izquierda -->
            <div class="flex flex-column align-items-center ">
                <Button @click="tornar()" class="button_login" label="TORNAR"></Button>
            </div>
            
            <div class="ranking">
                <div v-for="(player, index) in ranking.ranking" :key="player.id">
                   {{ index+1 }} - {{ player.username }} - {{ player.num_victorias }}
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>

#background_page {
    background-image: url(../assets/landing_background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    opacity: 80%;
    width: 99vw;
    z-index: -1;
}
.button_login {
    position: absolute;
    top: 5%;
    left: 93%;
    transform: translate(-50%, -50%);
    background-image: radial-gradient(var(--primary-300), var(--primary-600));
    color: var(--primary-color-text);
    font-size: 1rem;
    font-weight: bold;
    border-radius: 1rem;
    padding: 1rem 2rem;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
}
.ranking{
    width: 80%;
    height: 80%;
    margin-left: auto;
    margin-right: auto;
    display: block;
    font-size: large;
    color: white;
    text-align: center;
    font-size: large;
    border-radius: 50%;
    padding: 1rem 2rem;
}
.ranking>div:nth-child(odd){
    background-color: #4CAF50;
}
.ranking>div:nth-child(even){
    background-color: #2196F3;
}
</style>

<script>
import { socket } from '../socket';
import { useAppStore } from '../stores/guestStore.js';
export default {
    

    computed: {
        ranking() {
            const store = useAppStore();
            return store.getRanking();
        }
    },
    methods: {
        getRanking() {
            console.log('getRanking');
            socket.emit('getRanking');
            
        },
        tornar() {
            this.$router.push({ path: '/' });
        }
        
    },
    watch: {
        ranking() {
            console.log('ranking', this.ranking.ranking[0].username);
        }
    },
    mounted() {
        this.getRanking();
        setInterval(this.getRanking, 60000);
    }
};
</script>
