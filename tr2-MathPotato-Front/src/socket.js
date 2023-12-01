import { io } from "socket.io-client";
import { useAppStore } from '@/stores/guestStore';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "localhost:5175";

export const socket = io(URL);

socket.on("usersConnected", (usersConnected) => { 
    const store = useAppStore();
    store.setGuestInfo(usersConnected);
    console.log("Jose"+ usersConnected);

    store.setUsers(usersConnected);
});

socket.on("usersDesconectados", (usersDisconected) => { 
    const storeDisc = useAppStore();
    storeDisc.setGuestInfo(usersDisconected);
    
});