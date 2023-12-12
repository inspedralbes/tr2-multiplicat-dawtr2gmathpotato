<template>
    <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div class="text-center mb-5">
            <img src="../assets/LePotata.png" alt="Image" height="50" class="mb-3" />
            <div class="text-900 text-3xl font-medium mb-3">Benvingut!</div>
            <span class="text-600 font-medium line-height-3">Ja tens compte?</span>
            <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="Login">Inicia sessió!</a>
        </div>

        <div>
            <label for="username" class="block text-900 font-medium mb-2">Username</label>
            <InputText id="username" type="text" class="w-full mb-3" v-model="username"/>

            <label for="email1" class="block text-900 font-medium mb-2">Email</label>
            <InputText id="email1" type="text" class="w-full mb-3" v-model="email" />

            <label for="password1" class="block text-900 font-medium mb-2">Password</label>
            <InputText id="password1" type="password" class="w-full mb-3" v-model="password" />


            <label for="passwordC" class="block text-900 font-medium mb-2">Password Confirmation</label>
            <InputText id="passwordC" type="password" class="w-full mb-3" v-model="passwordConfirmation"/>
            <p>Selecciona icona</p>
            <div id="Image_gallery">
                <div><input type="radio" name="image" id="1"  value="1" checked v-model="imatgeSeleccionada"><label for="1"><img src="../assets/Icon_1.png" alt=""
                            class="icon"></label></div>
                <div><input type="radio" name="image" id="2" value="2" v-model="imatgeSeleccionada"><label for="2"><img src="../assets/Icon_2.png" alt=""
                            class="icon"></label></div>
                <div><input type="radio" name="image" id="3" value="3" v-model="imatgeSeleccionada"><label for="3"><img src="../assets/Icon_3.png" alt=""
                            class="icon"></label></div>
                <div><input type="radio" name="image" id="4" value="4" v-model="imatgeSeleccionada"><label for="4"><img src="../assets/Icon_4.png" alt=""
                            class="icon"></label></div>
                <div><input type="radio" name="image" id="5" value="5" v-model="imatgeSeleccionada"><label for="5"><img src="../assets/Icon_5.png" alt=""
                            class="icon"></label></div>
                <div><input type="radio" name="image" id="6" value="6" v-model="imatgeSeleccionada"><label for="6"><img src="../assets/Icon_6.png" alt=""
                            class="icon"></label></div>
                <div><input type="radio" name="image" id="7" value="7" v-model="imatgeSeleccionada"><label for="7"><img src="../assets/Icon_7.png" alt=""
                            class="icon"></label></div>
                <div><input type="radio" name="image" id="8" value="8" v-model="imatgeSeleccionada"><label for="8"><img src="../assets/Icon_8.png" alt=""
                            class="icon"></label></div>
            </div>

            <Button label="Sign In" icon="pi pi-user" class="w-full" @click="registrar"></Button>
        </div>
    </div>
</template>
<style>
#Image_gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 50vw;
}

.icon {
    width: 14vw;
}

input[type="radio"] {
    display: none;
}

input[type="radio"]:checked+label>img {
    border: 2px solid #000;
}
</style>

<script>
import { socket } from '../socket';

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            imatgeSeleccionada: '1',
        };
    },
    methods: {
        Login() {

            this.$router.push({ path: '/login' });

        },
        handleUserList(users) {
            this.users = users;
            console.log(this.users);
        },
        async register() {
                try {
                    const hashedPassword = await hashFunction(this.password);
                    const hashedConfirmation = await hashFunction(this.passwordConfirmation);

                    const response = await fetch('localhost:8000/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: this.username,
                            email: this.email,
                            password: hashedPassword,
                            password_confirmation: hashedConfirmation,
                            foto_perfil: this.imatgeSeleccionada
                        })
                    });

                    if (response.ok) {
                        this.$router.push({ path: '/play' });
                    } else {
                        throw new Error('Registration failed');
                    }
                } catch (error) {
                    console.error(error);
                    // Show error message to the user
                }
            }
    },
}
</script>