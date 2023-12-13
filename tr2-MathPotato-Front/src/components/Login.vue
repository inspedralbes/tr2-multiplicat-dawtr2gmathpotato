<template>
    
<div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
    <div class="text-center mb-5">
        <img src="@/assets/LePotata.png" alt="Image" height="50" class="mb-3" />
        <div class="text-900 text-3xl font-medium mb-3">Benvingut!</div>
        <span class="text-600 font-medium line-height-3">Don't have an account?</span>
        <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="Register">Create today!</a>
    </div>

    <div>
        <label for="email1" class="block text-900 font-medium mb-2">Email</label>
        <InputText id="email1" type="text" class="w-full mb-3" v-model="email"/>

        <label for="password1" class="block text-900 font-medium mb-2">Password</label>
        <InputText id="password1" type="password" class="w-full mb-3" v-model="password"/>

        <div class="flex align-items-center justify-content-between mb-6">
            <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot password?</a>
        </div>

        <Button label="Sign In" icon="pi pi-user" class="w-full"></Button>
    </div>
</div>
</template>
<script>

import { socket } from '@/socket';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        Register() {

                this.$router.push({ path: '/register' });
            
        },
        handleUserList(users) {
            this.users = users;
            console.log(this.users);
        },
        Loggin(){
            socket.emit('login', this.email, this.password);
            this.$router.push({ path: '/play' });
        }
    },
    //     mounted() {
    //         // Escuchar eventos de usuarios después de que el componente está montado
    //         socket.on('nuevosUsuario', this.handleUserList);
    //   },
};


</script>