import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        guestInfo: {
            username: '',
            id: '',
            bomba: false,
            image: './assets/Icon_2.png'
        },
        users:[],
        pregunta: {
            id_pregunta:"",
            pregunta:""
        },
        respostaAnterior: true,
        gameStarted: false

    }), 
    actions: {
        setUsers(items){
            this.users = items;
            console.log(this.users);

        },
        getUsers(){
            return this.users;
        },
        setGuestInfo(username, id) {
            this.guestInfo.username = username;
            this.guestInfo.id = id;

            console.log('infoGuest');
            console.log(this.guestInfo.username);
            console.log(this.guestInfo.id);
            
        },
        getGuestInfo() {
            return this.guestInfo;
        },
        clearGuestInfo() {
            this.guestInfo.username = '';
            this.guestInfo.id = '';
        }, 
        updateUsersOnDisconnect(users) {
            this.setUsers(users);
        },
        setPregunta(pregunta){
            this.pregunta.id_pregunta=pregunta.id_pregunta;
            this.pregunta.pregunta=pregunta.pregunta
        },
        getPregunta(){
            return this.pregunta;  
        },
        setRespostaAnterior(resposta){
            this.respostaAnterior = resposta;
        },
        getRespostaAnterior(){
            return this.respostaAnterior;
        },
        setGameStarted(gameStarted){
            console.log("gameStarted");
            this.gameStarted = gameStarted;
        },
        getGameStarted(){
            return this.gameStarted;
        }
    }
});