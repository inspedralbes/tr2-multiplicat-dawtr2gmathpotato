import { io } from "socket.io-client";
// import { useAppStore } from '@/stores/app';

// "undefined" means the URL will be computed from the `window.location` object
const URL = "localhost:5175";

export const socket = io(URL);

socket.on("connect", () => { 
    console.log("connected") 
});

socket.on("disconnect", () => { 
    console.log("disconnected") 
});