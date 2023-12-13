
import { io } from "socket.io-client";
// import { onMounted } from 'vue';
import { useAppStore } from '@/stores/guestStore';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "localhost:5175";

export const socket = io(URL);

// const join = (roomGame) => {
//     const store = useAppStore();
//     socket.emit('join', { username: store.guestInfo.username, id: store.guestInfo.id, room: roomGame });
//   };

// onMounted(() => {
//     //join sala de juego
//     join('gameRoom');
//     console.log('hi');
    socket.on("usersConnected", (usersConnected, roomGame) => {
        console.log(roomGame);
        const store = useAppStore();
        console.log('Usuarios conectados: ', usersConnected);
        
        // Filtra los usuarios basándose en el socket.id actual
        const currentUser = usersConnected.find(user => user.id === socket.id);

        if (currentUser) {
            // Guarda la información del usuario actual en Pinia
            store.setGuestInfo(currentUser.username, currentUser.id);
        }

        // Establece el array de usuarios en Pinia
        store.setUsers(usersConnected);
        store.setRoomName(roomGame);
        store.setUsersInRoom(usersConnected);
        store.setRespostaAnterior(true);
    });

    // socket.on("username", (username, id) => { 
    //     const store = useAppStore();
    //     store.setGuestInfo(username, id);
    //     console.log(username);
        
    // });

    socket.on("usersDesconectados", (usersConnected) => { 
        const store = useAppStore();
        console.log('Usuarios desconectados: ', usersConnected);
        store.updateUsersOnDisconnect(usersConnected);  
        store.updateUsersOnDisconnectInRoom(usersConnected);  
    });

    socket.on("disconnect", (usersConnected) => {
        const store = useAppStore();
        console.log("*Desconectado del servidor*");
        store.clearGuestInfo();
        store.updateUsersOnDisconnectInRoom(usersConnected);
    });

    socket.on("gameStarted", (gameStarted) => {
        const store = useAppStore();
        console.log('El juego ha comenzado! ', gameStarted);
        store.setGameStarted(gameStarted);

    });

    socket.on("pregunta", (pregunta) => {
        const store = useAppStore();
        console.log('Nueva pregunta: ', pregunta);
        store.setPregunta(pregunta);
    });

    socket.on("changeBomb", (newUsersData) => {
        const store = useAppStore();
        console.log('Cambio de bomba: ', newUsersData.bombChange);
        store.setUsers(newUsersData.arrayUsers);
        store.setRespostaAnterior(newUsersData.bombChange);
    });

    // socket.on("gameRooms", (gameRooms) => {
    //     const store = useAppStore();
    //     console.log('Salas de juego: ', gameRooms);
    //     store.setGameRooms(gameRooms);
    // });
// });

