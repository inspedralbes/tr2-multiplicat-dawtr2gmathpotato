import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        infoGame: {            
            rooms: {
                gameRooms: [
                    {
                         users: [
                            {username: '', id: '', bomba: false, image: './assets/Icon_2.png'}
                        ]
                    },
                ],   
                }
            }, 
        guestInfo: {
            username: '',
            id: '',
            bomba: false,
            image: './assets/Icon_2.png',
            lives: 2
        },
        users:[],
        pregunta: {
            id_pregunta:"", 
            pregunta:""
        },
        respostaAnterior: true,
        timer: 0,
        gameStarted: false,

    }), 
    actions: {
        setRoomName(roomGame){
            this.infoGame.rooms.gameRooms[0].roomName = roomGame;
            console.log(this.infoGame.rooms.gameRooms[0].roomName);
        },
        setGameStarted(gameStarted){
            this.gameStarted = gameStarted;
        
        },
        getGameStarted(){
            return this.gameStarted;
        },
        setGameRooms(gameRooms){
            this.infoGame.rooms.gameRooms = gameRooms;
            console.log(this.infoGame.rooms.gameRooms);
        },
        getGameRooms(){
            return this.infoGame.rooms.gameRooms;
        },
        getRoomName(){
            return this.infoGame.rooms.gameRooms[0].roomName;
        },
        setUsersInRoom(users){
            this.infoGame.rooms.gameRooms[0].users = users;
            console.log(this.infoGame.rooms.gameRooms[0].users);
        },
        getUsersInRoom(){
            return this.infoGame.rooms.gameRooms[0].users;
        },
        updateUsersOnDisconnectInRoom({roomName, users }) {
            if(this.infoGame.rooms.hasOwnProperty(roomName)){
                this.infoGame.rooms[roomName].users = users;
                console.log('Usuarios en la sala ${roomName} actualizados: ', users);
            }
        },
        setUsers(users){
            this.users = users;
            console.log(this.users);
        },     
        getUsers(){
            return this.users;
        },    
        updateUsersOnDisconnect(users) {
            this.setUsers(users);
        },    
        setGuestInfo(username, id) {
            this.guestInfo.username = username;
            this.guestInfo.id = id;

            console.log('*infoGuest*');
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
        setTimer(timerValue){
            this.timer = timerValue;
        },
        getTimer(){
            return this.timer;
        }
    }
});