<template>
    <div id="background">
        <div v-for="(user, index) in users">
            <div class="user" :id="'user'+index">
                <img :src="user.image" alt="image" class="icon" style="background-color: {{ user.background}};">
                <p>{{ user.name }}</p>
            </div>
        </div>
    </div>
</template>
<style>
#background {
    background-image: url("../assets/background2.png");
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 99vw;
    background-position: center;
    z-index: -1;
    display: grid;
    grid-template-columns: 1fr 1fr;
} 
.icon{
    border-radius: 50%;
    width: 7vw;
    border: 1px solid black;
    background-color: blanchedalmond;
}

.user{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 2vw;
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
                    background:'#' + Math.floor(Math.random()*16777215).toString(16)

                },
                {
                    id: 2,
                    name: "Pepita",
                    image: "./src/assets/LePotata.png",
                    background:'#' + Math.floor(Math.random()*16777215).toString(16)

                },
                {
                    id: 3,
                    name: "Pepinho",
                    image: "./src/assets/LePotata.png",
                    background:'#' + Math.floor(Math.random()*16777215).toString(16)
                },
                {
                    id: 4,
                    name: "Papote",
                    image: "./src/assets/LePotata.png",
                    background:'#' + Math.floor(Math.random()*16777215).toString(16)
                },
                {
                    id: 5,
                    name: "Papilla",
                    image: "./src/assets/LePotata.png",
                    background:'#' + Math.floor(Math.random()*16777215).toString(16)
                },
                {
                    id: 6,
                    name: "Juan",
                    image: "./src/assets/LePotata.png",
                    background:'#' + Math.floor(Math.random()*16777215).toString(16)
                }
            ]
        }
    }
}
</script>