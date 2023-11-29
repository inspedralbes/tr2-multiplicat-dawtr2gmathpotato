<template>
    <div>
        <h1>Welcome, Guest!</h1>
        <div class="card flex justify-content-center">
                <form @submit="onSubmit" >
                        <span class="p-float-label">
                                <InputText v-model="username" type="text" :class="{ 'p-invalid': errorMessage }" aria-describedby="text-error" />
                                <label for="value">Name</label>
                        </span>
                        <small class="p-error" id="text-error">{{ errorMessage || '&nbsp;' }}</small>
                        <Button @click="onSubmit()" label="Submit" />
                </form>
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
            errorMessage: ''
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
        }
    }
};
    
</script>

<style scoped>
/* .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
} */
</style>
