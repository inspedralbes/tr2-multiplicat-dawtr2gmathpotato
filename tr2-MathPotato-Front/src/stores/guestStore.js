import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        infoGame: {            
            rooms: {
                gameRooms: [
                    {idRoom: 1, roomName:'', users: [{username: '', id: '', bomba: false, image: './assets/Icon_2.png'}]},
                    ],                    
                waitingRoom: {
                            users:[{username: '', id: '', bomba: false, image: './assets/Icon_2.png'}]
                        }
                    }
                }, 
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
        setUsersInRoom(roomName, users){
            if(this.infoGame.rooms.hasOwnProperty(roomName)) {
                this.infoGame.rooms[roomName].users = users;
                console.log('room users!');
                console.log(this.infoGame.rooms[roomName].users);
            }else{
                console.error('La sala ${roomName} no existe');
            }
            
        },
        getUsers(){
            return this.users;
        },
        getUsersInRoom(roomName){
            if(this.infoGame.rooms.hasOwnProperty(roomName)) {
                return this.infoGame.rooms[roomName].users;
            }else{
                console.error('La sala ${roomName} no existe');
                return [];
            }
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