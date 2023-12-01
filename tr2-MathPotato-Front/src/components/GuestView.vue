<template>
    <div>
    <h1>Welcome, Guest!</h1>
    <div class="card flex justify-content-center">
        
        <span class="p-float-label">
            <InputText v-model="username" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
            <label for="value">Name</label>
        </span>
        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
        <Button @click="onSubmit()" label="Submit" :to="{ path: '/play' }"/>
                
                <ul>
                    <li>
                        <h3>Users Conectados</h3>
                        <ul>
                            <li v-for="user in users" :key="user.username">
                                {{ user.username }}
                            </li>
                        </ul>
                    </li>
                </ul>
                <Toast />
        </div>
    </div>
</template>

<script>

import { socket } from '../socket';

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
                socket.emit('join', this.username);
                
            }
        },
        handleUserList(users) {
        this.users = users;
        console.log(this.users);
        },
    },
    mounted() {
        // Escuchar eventos de usuarios después de que el componente está montado
        socket.on('nuevosUsuario', this.handleUserList);
  },
};

    
</script>

<style scoped>
/* .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
} */
</style>
       
