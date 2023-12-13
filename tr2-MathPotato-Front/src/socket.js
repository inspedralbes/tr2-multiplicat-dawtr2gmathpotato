import { io } from "socket.io-client";
import { useAppStore } from '@/stores/guestStore';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "localhost:5175";

export const socket = io(URL);

socket.on("usersConnected", (usersConnected) => {
    const store = useAppStore();

    console.log('Usuarios conectados');
    console.log(usersConnected);

    // Filtra los usuarios basándose en el socket.id actual
    const currentUser = usersConnected.find(user => user.id === socket.id);

    if (currentUser) {
        // Guarda la información del usuario actual en Pinia
        store.setGuestInfo(currentUser.username, currentUser.id);
    }

    // Establece el array de usuarios en Pinia
    store.setUsers(usersConnected);
    store.setRespostaAnterior();
    console.log(usersConnected);
    store.setRespostaAnterior(true);
});

// socket.on("username", (username, id) => { 
//     const store = useAppStore();
//     store.setGuestInfo(username, id);
//     console.log(username);
    
// });

socket.on("usersDesconectados", (usersConnected) => { 
    const storeDisc = useAppStore();
    storeDisc.updateUsersOnDisconnect(usersConnected);    
});

socket.on("disconnect", () => {
    const storeDisc = useAppStore();
    storeDisc.clearGuestInfo();
});

socket.on("gameStart", (gameStart) => {
    console.log(gameStart);
    socket.emit("preguntes");
});

socket.on("pregunta", (pregunta) => {
    // console.log(objPreguntes);
    const storeDisc=useAppStore();
    storeDisc.setPregunta(pregunta);
});

socket.on("changeBomb", (newUsersData) => {
    const storeDisc=useAppStore();
    storeDisc.setUsers(newUsersData.arrayUsers);
    console.log(newUsersData.bombChange);
    storeDisc.setRespostaAnterior(newUsersData.bombChange);
});
