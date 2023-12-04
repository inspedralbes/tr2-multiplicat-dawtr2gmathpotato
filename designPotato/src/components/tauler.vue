<template>
    <div id="background">
    <div id="grid">
        <div v-for="(user, index) in users" :id="getId(index)">
            <div class="user" :id="'user' + index">
                <img :src="user.image" alt="image" class="icon" style="background-color: {{ user.background}};">
                <p>{{ user.name }}</p>
            </div>
        </div>
        <div id="bombContainer"><img src="../assets/LePotata.png" alt="" class="bomb" id="bomb"></div>
        <div id="middle">
            <h1></h1>
            <button @click="changeBomb()" id="buttonC">Change bomb</button>
        </div>

    </div>
</div>
</template>
<style scoped>
:root{
    --xPositionAnt:0;
    --yPositionAnt: 0;
    --xPosition: 0;
    --yPosition: 0;
}
#background{
    background-image: url("../assets/backround2.png");
    background-repeat: no-repeat;
    height: 100vh;
    width: 99vw;
    background-size: cover;
    background-position: center;
}
.moveBomb{
    animation-name: bombMovement;
    animation-duration: 1s;
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
    from{
        top: var(--yPositionAnt);
        left: var(--xPositionAnt);
    }
    to{
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
export default {
    data() {
        return {
            users: [
                {
                    id: 1,
                    name: "Pepito",
                    image: "./src/assets/Icon_2.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    bomba: false

                },
                {
                    id: 2,
                    name: "Pepita",
                    image: "./src/assets/Icon_2.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    bomba: false
                },
                {
                    id: 3,
                    name: "Pepinho",
                    image: "./src/assets/Icon_2.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    bomba: true
                },
                {
                    id: 4,
                    name: "Papote",
                    image: "./src/assets/Icon_2.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    bomba: false
                },
                {
                    id: 5,
                    name: "Papilla",
                    image: "./src/assets/Icon_2.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    bomba: false
                },
                {
                    id: 6,
                    name: "Juan",
                    image: "./src/assets/Icon_2.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16),
                    bomba: false
                }

            ]
        }
    },
    methods: {
        getId(index) {
            let size = this.users.length;
            switch (size) {
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
        changeBomb() {
            let size = this.users.length;
            let usersWithBomb = this.findUsersWithBomb();
            console.log(usersWithBomb);
            this.users[usersWithBomb].bomba = false;
            let newUserBomb = usersWithBomb + 1;
            if (newUserBomb >= size) {
                newUserBomb = 0;
            }
            let object = "user" + (newUserBomb);
            let userBombpos = document.getElementById(object).getBoundingClientRect();
            let objectAnt = "user" + (usersWithBomb);
            let objectAntpos = document.getElementById(objectAnt).getBoundingClientRect();
            let userBombXAnt = objectAntpos.x + 100;
            let userBombYAnt = objectAntpos.y;
            document.getElementById("bombContainer").style.setProperty("--xPositionAnt", userBombXAnt+"px");
            document.getElementById("bombContainer").style.setProperty("--yPositionAnt", userBombYAnt+"px");
            let userBombX = userBombpos.x + 100;
            let userBombY = userBombpos.y;
            document.getElementById("bombContainer").style.setProperty("--xPosition", userBombX+"px");
            document.getElementById("bombContainer").style.setProperty("--yPosition", userBombY+"px");  
            //usersWithBomb.forEach(user => user.bomba = true);
            //let random = Math.floor(Math.random() * size);
            this.users[newUserBomb].bomba = true;
            document.getElementById("bombContainer").classList.add("moveBomb");
            setTimeout(() => {
        document.getElementById("bombContainer").classList.remove("moveBomb");}, 1000);
        },
        findUsersWithBomb() {
            return this.users.findIndex(user => user.bomba === true);
            //return this.users.filter(user => user.bomba === true);
        },
    },
    mounted(){
        this.changeBomb()
    }
}
</script>