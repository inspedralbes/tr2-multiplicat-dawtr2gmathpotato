<template>
    <div>
        <div id="background_page" class="flex flex-column justify-content-center align-items-center h-100vh">
            <div class="flex flex-column align-items-center ">
            <Button @click="tutorial()" class="button_tutorial" label="TUTORIAL"></Button>
        </div>
            <h1>Welcome, Guest!</h1>
            <div class="card flex justify-content-center">

                <img alt="Vue logo" class="logo" src="@/assets/lePotata.png" width="125" height="125" />

                <span class="p-float-label">
                    <InputText v-model="username" type="text" :class="{ 'p-invalid': errorMessage }"
                        aria-describedby="text-error" @keyup.enter="onSubmit()" />
                    <label for="value">Name</label>
                </span>
                <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>

                <Button @click="onSubmit()" label="Submit" />
                <Toast />

            </div>
        </div>
    </div>
</template>

<script>

import { socket } from '../socket';
import tutorial from './Tutorial.vue';


export default {
    data() {
        return {
            username: '',
            errorMessage: '',
            users: []
        };
    },
    methods: {
        onSubmit() {
            if (this.username === '') {
                this.errorMessage = 'Please enter your name';
            } else {
                // Submit the form
                socket.emit('join', {username:this.username, image:1, email:'none'});
                this.$router.push({ path: '/play' });
            }
        },
        handleUserList(users) {
            this.users = users;
            console.log(this.users);
        },
        tutorial() {
            this.$router.push({ path: '/tutorial' });
        },
    },
    //     mounted() {
    //         // Escuchar eventos de usuarios después de que el componente está montado
    //         socket.on('nuevosUsuario', this.handleUserList);
    //   },
};


</script>

<style scoped>
#background_page {
    background-image: url(../assets/landing_background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    opacity: 0.8;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.button_tutorial {
    position: absolute;
    top: 5%;
    left: 7%;
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
/* .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
} */
</style>

