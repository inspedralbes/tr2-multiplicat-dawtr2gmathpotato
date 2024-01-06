<template>
    <div>
        <div id="background_page" class="flex flex-row justify-content-between h-100vh">
            <!-- Logo a la izquierda -->
            <div class="flex flex-column align-items-center ">
                <Button @click="login()" class="button_login" label="LOG IN"></Button>
            </div>
            
            <div class="ranking">
                
            </div>
        </div>

    </div>
</template>

<style scoped>

#background_page {
    background-image: url(../assets/landing_background.png);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 100vh;
    opacity: 80%;
    width: 99vw;
    z-index: -1;
}
.button_login {
    position: absolute;
    top: 5%;
    left: 93%;
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
</style>

<script>

export default {
    methods: {
        login() {
            this.$router.push({ path: '/login' });
        }
    }
};
</script>
