<template>
    <div id="background">
        <div id="grid">
            <div v-for="(user, index) in users" :id="getId(index)">
                <div class="user" :id="'user' + index">
                    <div class="imageContainer">
                        <img :src="user.image" alt="image" class="icon" :style="{ 'background-color': user.background }">
                        <div class="vidaContainer" v-for="n in user.life" :key="n">
                            <img src="@/assets/potatHeart.png">
                        </div>
                    </div>
                    <p class="name">{{ user.username }}</p>

                </div>
            </div>
            <div id="bombContainer" :class="[gameStarted ? '' : 'hidden']"><img src="../assets/LePotata.png" alt=""
                    class="bomb" id="bomb"></div>
            <div id="middle">
                <Button @click="startGame" id="startGameButton" :disabled="users.length <= 2"
                    v-if="!gameStarted">START!</Button>

                <div v-if="gameStarted" class="gameContainer">
                    <h3>{{ message.pregunta }}</h3>
                    <input type="text" name="resposta" id="resposta" v-model="respuesta">
                    <Button @click="enviarResposta" icon="pi pi-check" aria-label="Submit" />
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
    display: hidden;
}

.name {
    text-shadow: 2px 0 #000, -2px 0 #000, 0 2px #000, 0 -2px #000, 1px 1px #000, -1px -1px #000, 1px -1px #000, -1px 1px #000;
}

#background {
    background-image: url("../assets/backround2.png");
    background-repeat: no-repeat;
    height: 100vh;
    width: 99vw;
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


}
.moveBomb {
    animation-name: bombMovement;
    animation-duration: 2s;
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

@keyframes hunch {
    from {
        transform: scale(1);
    }

    to {
        transform: scale(1.2);
    }
}
</style>
<script>
import { useAppStore } from '../stores/guestStore.js';
import { socket } from '../socket';
import { useSSRContext, useTransitionState } from 'vue';

export default {
    data() {
        return {
            gameStarted: false,
            pregunta: {},
            respuesta: "",

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

        message() {
            let store = useAppStore();
            return store.getPregunta();
        }

    },
    watch: {
        users: {
            immediate: true, // Ejecutar al inicio
            handler(newVal) {
                console.log(this.encertada);
                if (newVal && newVal.length > 0 && this.encertada) {
                    this.changeBomb();
                }
            }
        }
    },
    methods: {
        enviarResposta() {
            const resposta = this.respuesta;
            console.log("emit respost -> ", resposta);
            socket.emit('resposta', resposta);
            this.respuesta = "";
        },
        startGame() {
            this.gameStarted = true;

            socket.emit('startGame');
        },
        getId(index) {
            let size = this.users.length;
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

            let size = this.users.length;
            let usersWithBomb = this.findUsersWithBomb();
            console.log(usersWithBomb);
            this.users[usersWithBomb].bomba = false;
            let newUserBomb = usersWithBomb + 1;
            if (newUserBomb >= size) {
                newUserBomb = 0;
            }
            let object = "user" + (newUserBomb);
            let userElement = document.getElementById(object);

            // Verificar si el elemento está presente antes de acceder a sus propiedades
            if (userElement) {
                let userBombpos = userElement.getBoundingClientRect();
                let objectAnt = "user" + (usersWithBomb);
                let objectAntElement = document.getElementById(objectAnt);
                if (objectAntElement) {
                    let objectAntpos = objectAntElement.getBoundingClientRect();
                    let userBombXAnt = objectAntpos.x + 100;
                    let userBombYAnt = objectAntpos.y;
                    if (this.users.length > 2) {
                        document.getElementById("bombContainer").style.setProperty("--xPositionAnt", userBombXAnt + "px");
                        document.getElementById("bombContainer").style.setProperty("--yPositionAnt", userBombYAnt + "px");
                    }
                }

                let userBombX = userBombpos.x + 100;
                let userBombY = userBombpos.y;
                document.getElementById("bombContainer").style.setProperty("--xPosition", userBombX + "px");
                document.getElementById("bombContainer").style.setProperty("--yPosition", userBombY + "px");

                this.users[newUserBomb].bomba = true;
                document.getElementById("bombContainer").classList.add("moveBomb");
                setTimeout(() => {
                    document.getElementById("bombContainer").classList.remove("moveBomb");
                }, 2000);
            }
        },
        findUsersWithBomb() {
            return this.users.findIndex(user => user.bomba === true);
            //return this.users.filter(user => user.bomba === true);
        },
    },
    mounted() {
        console.log(this.users);
        return this.users.findIndex(user => user.bomba === true);
        //return this.users.filter(user => user.bomba === true);
    }
}
</script>