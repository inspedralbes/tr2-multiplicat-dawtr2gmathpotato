<template>
    <div class="container">
    <div id="grid">
        <div v-for="(user, index) in users" :id="getId(index)">
            <div class="user">
                <img :src="user.image" alt="image" class="icon" style="background-color: {{ user.background}};">
                <p>{{ user.name }}</p>
            </div>
        </div>
    </div>
</div>
</template>
<style scoped>
.container {
    background-image: url("../assets/backround2.png");
    background-repeat: no-repeat;
    height: 100vh;
    width: 99vw;
    background-size: cover;

    background-position: center;
}

#background {
    position: absolute;
    width: 67vw;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    z-index: -1;
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
    grid-template-areas: ". topleft topmid topright ." "leftmid . . . rightmid" ". bottomleft bottommid bottomright .";
    width: 87vw;
    height: 100vh;
    margin-left: auto;
    margin-right: auto;
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
</style>
<script>
export default {
    data() {
        return {
            users: [
                {
                    id: 1,
                    name: "Pepito",
                    image: "./src/assets/LePotata.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16)

                },
                {
                    id: 2,
                    name: "Pepita",
                    image: "./src/assets/LePotata.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16)

                },
                {
                    id: 3,
                    name: "Pepinho",
                    image: "./src/assets/LePotata.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16)
                },
                {
                    id: 4,
                    name: "Papote",
                    image: "./src/assets/LePotata.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16)
                },
                {
                    id: 5,
                    name: "Papilla",
                    image: "./src/assets/LePotata.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16)
                },
                {
                    id: 6,
                    name: "Juan",
                    image: "./src/assets/LePotata.png",
                    background: '#' + Math.floor(Math.random() * 16777215).toString(16)
                }
                
            ],
            usersColocats: []
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
                            return "bottomleft";
                        case 2:
                            return "bottomright";
                    }
                    break;
                case 4:
                    switch (index) {
                        case 0:
                            return "topmid";
                        case 1:
                            return "leftmid";
                        case 2:
                            return "rightmid";
                        case 3:
                            return "bottommid";
                    }
                    break;
                case 5:
                    switch (index) {
                        case 0:
                            return "topmid";
                        case 1:
                            return "leftmid";
                        case 2:
                            return "rightmid";
                        case 3:
                            return "bottomleft";
                        case 4:
                            return "bottomright";

                    }
                    break;
                case 6:
                    switch (index) {
                        case 0:
                            return "topleft";
                        case 1:
                            return "topright";
                        case 2:
                            return "leftmid";
                        case 3:
                            return "rightmid";
                        case 4:
                            return "bottomleft";
                        case 5:
                            return "bottomright";

                    }

            };
        }
    }
}
</script>