<template>
    <div id="background">
        <div id="grid">
            <div v-for="(user, index) in users" :id="getId(index)">
                <div class="user" :id="'user' + index">
                    <div class="imageContainer">
                        <div class="vidaContainer" v-for="n in user.lives-1" :key="n">
                            <img src="@/assets/potatHeart.png">
                        </div>
                        
                        <img :src="'./src/assets/Icon_'+user.image+'.png'" alt="image" class="icon" :class="[user.bomba ? 'userWithBomb' : 'userWithout']" :style="{ 'background-color': user.background }">
                    </div>
                    <p class="name">{{ user.username }}</p>
                </div>
            </div>
            <div id="bombContainer" :class="[gameStarted ? '' : 'hidden']"><img src="../assets/LePotata.png" alt=""
                    class="bomb" id="bomb"><span class="bombCounter">{{ timer }}</span></div>
            <div id="middle">
                <Button @click="startGame" id="startGameButton" :disabled="users.length <= 2"
                :class="[gameStarted ? 'hidden' : '']">START!</Button>

                <div :class="[gameStarted ? '' : 'hidden']"  class="gameContainer">
                    <h3>{{ message.pregunta }}</h3>
                    <input type="text" name="resposta" id="resposta" @keyup.enter="enviarResposta" v-model="respuesta">
                    <Button @click="enviarResposta"   icon="pi pi-check" aria-label="Submit" />
                    
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
:root {
    --xPositionAnt: 0;
    --yPositionAnt: 0;
    --xPosition: 0;
    --yPosition: 0;
}

.hidden {
    display: none;
}

.name {
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
}

#background {
    background-image: url("../assets/backround2.png");
    background-repeat: no-repeat;
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
}
.gameContainer>h3{
    color: white;
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
    
}
.gameContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("../assets/backgroundPregunta.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    border-radius: 20px;
    width: 90%;
}
.gameContainer>input{
    width: 80%;
    height: 5vh;
    border-radius: 10px;
    border: 1px solid black;
    margin-bottom: 10px;
    font-size: 1.5vw;
    font-weight: bold;
    color: black;
    filter: brightness(1);
}

.moveBomb {
    animation-name: bombMovement;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
}

#bombContainer {
    position: absolute;
    top: var(--yPosition);
    left: var(--xPosition);

}

@keyframes bombMovement {
    from {
        top: var(--yPositionAnt);
        left: var(--xPositionAnt);
    }

    to {
        top: var(--yPosition);
        left: var(--xPosition);
    }
}


.icon {
    border-radius: 50%;
    width: 7vw;
    border: 1px solid black;
    background-color: blanchedalmond;
    margin: 0;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;

}

.imageContainer {
    display: flex;

}

.vidaContainer img {
    width: 40px;
    height: 40px;
    margin-top: 5px;
}

#grid {
    background-image: url("../assets/table.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: grid;
    grid-template-areas: ". topleft topmid topright ." "leftmid . middle . rightmid" ". bottomleft bottommid bottomright .";
    width: 87vw;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
}

#middle {
    grid-area: middle;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;

    font-weight: bold;

}


#topleft {
    grid-area: topleft;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

#topmid {
    grid-area: topmid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

#topright {
    grid-area: topright;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

#leftmid {
    grid-area: leftmid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

#rightmid {
    grid-area: rightmid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

#bottomleft {
    grid-area: bottomleft;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

#bottommid {
    grid-area: bottommid;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

#bottomright {
    grid-area: bottomright;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: bold;
    color: white;
}

.bomb {
    width: 10vw;
    animation-name: hunch;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    position: absolute;
}

.bombCounter {
    position: absolute;
    top: 6vw;
    left: 9.3vh;
    animation-name: hunch;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    font-size: 1.2rem;
    font-weight: bold;
    color: red;
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
}

@keyframes hunch {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
}

.userWithBomb{
    border: 4px solid #3772FF;
}
.userWithout{
    filter: grayscale(30%) ;
    /* opacity: 0.7; */
    
}
</style>
<script>
import { useAppStore } from '../stores/guestStore.js';
import { socket } from '../socket';
import { useSSRContext, useTransitionState } from 'vue';

export default {
    data() {
        return {
            pregunta: {},
            respuesta: "",
            timer: 0,

        };
    },
    computed: {
        encertada() {
            let store = useAppStore();
            return store.getRespostaAnterior();
        },
        users() {
            let store = useAppStore();
            return store.getUsers();
        },
        timer() {
            let store = useAppStore();
            return store.getTimer();
        },
        message() {
            let store = useAppStore();
            return store.getPregunta();
        },
        gameStarted() {
            let store = useAppStore();
            return store.getGameStarted();
        },
        
        
    },
    watch: {
        users: {
            handler(newVal) {
                console.log(this.encertada);
                if (newVal && newVal.length > 0 && this.encertada) {
                    console.log("change bomb");
                    this.changeBomb();
                    this.respuesta = "";    
                }
                console.log(newVal);
            }
        },
        
        // gameWinner(newVal) {
        //     // Cambiar gameStarted a false cuando gameWinner sea true
        //     if (newVal) {
        //         let store = useAppStore();
        //         store.setGameStarted(false);
        //     }
        // },
    },
    methods: {
        
        enviarResposta() {
            const resposta = this.respuesta;
            console.log("emit respost -> ", resposta);
socket.emit('resposta',  {"resposta":resposta,"room":this.users[0].roomPosition} );
            this.respuesta = "";
        },
        async startGame() {
            socket.emit('startGame', {gameStarted:true, roomPosition: this.users[0].roomPosition});
            await this.$nextTick();
            let objectAntElement = document.getElementById("user0");
            if (objectAntElement) {
                let userBombpos = objectAntElement.getBoundingClientRect();
                let userBombX = userBombpos.x + 100;
                let userBombY = userBombpos.y;
                document.getElementById("bombContainer").style.setProperty("--xPosition", userBombX + "px");
                document.getElementById("bombContainer").style.setProperty("--yPosition", userBombY + "px");
            }
        },
        getId(index) {
            let size = this.users.length;
            // console.log(size);
            switch (size) {
                case 1:
                    return "topmid";
                case 2:
                    switch (index) {
                        case 0:
                            return "topmid";
                        case 1:
                            return "bottommid";
                    }
                    break;
                case 3:
                    switch (index) {
                        case 0:
                            return "topmid";
                        case 1:
                            return "bottomright";
                        case 2:
                            return "bottomleft";
                    }
                    break;
                case 4:
                    switch (index) {
                        case 0:

                            return "topmid";
                        case 1:
                            return "rightmid";
                        case 2:
                            return "bottommid";
                        case 3:
                            return "leftmid";
                    }
                    break;
                case 5:
                    switch (index) {
                        case 0:
                            return "topmid";
                        case 1:
                            return "rightmid";
                        case 2:
                            return "bottomright";
                        case 3:
                            return "bottomleft";
                        case 4:
                            return "leftmid";

                    }
                    break;
                case 6:
                    switch (index) {
                        case 0:
                            return "topleft";
                        case 1:
                            return "topright";
                        case 2:
                            return "rightmid";
                        case 3:
                            return "bottomright";
                        case 4:
                            return "bottomleft";
                        case 5:
                            return "leftmid";
                    }

            };
        },
        async changeBomb() {
            await this.$nextTick(); // Espera hasta que el componente se haya renderizado completamente

            let usersWithBomb = this.findUsersWithBomb();
            let userWithBomb=document.getElementById("user"+usersWithBomb);
            console.log(userWithBomb);
            if (usersWithBomb !== -1) {
                let userBombpos = userWithBomb.getBoundingClientRect();
                let objectAntElement = document.getElementById("bombContainer");


                let objectAntpos = objectAntElement.getBoundingClientRect();
                let userBombXAnt = objectAntpos.x;
                let userBombYAnt = objectAntpos.y;

                document.getElementById("bombContainer").style.setProperty("--xPositionAnt", userBombXAnt + "px");
                document.getElementById("bombContainer").style.setProperty("--yPositionAnt", userBombYAnt + "px");


                let userBombX = userBombpos.x + 100;
                let userBombY = userBombpos.y;

                document.getElementById("bombContainer").style.setProperty("--xPosition", userBombX + "px");
                document.getElementById("bombContainer").style.setProperty("--yPosition", userBombY + "px");

                document.getElementById("bombContainer").classList.add("moveBomb");

                setTimeout(() => {
                    document.getElementById("bombContainer").classList.remove("moveBomb");
                }, 800);
            }

        },

        findUsersWithBomb() {
            return this.users.findIndex(user => user.bomba === true);
            //return this.users.users.filter(user => user.bomba === true);
        },
    },
    mounted() {
        return this.users.findIndex(user => user.bomba === true);
        
        //return this.users.users.filter(user => user.bomba === true);
        

    }
}

</script>