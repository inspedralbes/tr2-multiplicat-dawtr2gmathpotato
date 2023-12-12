/* __placeholder__ */
export default (await import('vue')).defineComponent({
data() {
return {
gameStarted: false,
pregunta: {},
respuesta: "",
};
},
computed: {
encertada() {
let store = useAppStore();
return store.getRespostaAnterior();
},
users() {
let store = useAppStore();
return store.getUsers();
},

message() {
let store = useAppStore();
return store.getPregunta();
}
},
watch: {
users: {
immediate: true,
handler(newVal) {
console.log(this.encertada);
if (newVal && newVal.length > 0 && this.encertada) {
this.changeBomb();
}
else {
this.showFailureMessage();

}
}
}
},
methods: {
showFailureMessage() {
alert('¡Has fallado! Inténtalo de nuevo.'); // Puedes usar un componente de notificación en lugar de alert
},

enviarResposta() {
const resposta = this.respuesta;
console.log("emit respost -> ", resposta);
socket.emit('resposta', resposta);
this.respuesta = "";
},
startGame() {
this.gameStarted = true;

socket.emit('startGame');
},
getId(index) {
let size = this.users.length;
switch (size) {
case 1:
return "topmid";
case 2:
switch (index) {
case 0:
return "topmid";
case 1:
return "bottommid";
}
break;
case 3:
switch (index) {
case 0:
return "topmid";
case 1:
return "bottomright";
case 2:
return "bottomleft";
}
break;
case 4:
switch (index) {
case 0:
return "topmid";
case 1:
return "rightmid";
case 2:
return "bottommid";
case 3:
return "leftmid";
}
break;
case 5:
switch (index) {
case 0:
return "topmid";
case 1:
return "rightmid";
case 2:
return "bottomright";
case 3:
return "bottomleft";
case 4:
return "leftmid";

}
break;
case 6:
switch (index) {
case 0:
return "topleft";
case 1:
return "topright";
case 2:
return "rightmid";
case 3:
return "bottomright";
case 4:
return "bottomleft";
case 5:
return "leftmid";
}

};
},
async changeBomb() {
await this.$nextTick(); // Espera hasta que el componente se haya renderizado completamente

let size = this.users.length;
let usersWithBomb = this.findUsersWithBomb();
console.log(usersWithBomb);
this.users[usersWithBomb].bomba = false;
let newUserBomb = usersWithBomb + 1;
if (newUserBomb >= size) {
newUserBomb = 0;
}
let object = "user" + (newUserBomb);
let userElement = document.getElementById(object);

// Verificar si el elemento está presente antes de acceder a sus propiedades
if (userElement) {
let userBombpos = userElement.getBoundingClientRect();
let objectAnt = "user" + (usersWithBomb);
let objectAntElement = document.getElementById(objectAnt);
if (objectAntElement) {
let objectAntpos = objectAntElement.getBoundingClientRect();
let userBombXAnt = objectAntpos.x + 100;
let userBombYAnt = objectAntpos.y;
if (this.users.length > 2) {
document.getElementById("bombContainer").style.setProperty("--xPositionAnt", userBombXAnt + "px");
document.getElementById("bombContainer").style.setProperty("--yPositionAnt", userBombYAnt + "px");
}
}

let userBombX = userBombpos.x + 100;
let userBombY = userBombpos.y;
document.getElementById("bombContainer").style.setProperty("--xPosition", userBombX + "px");
document.getElementById("bombContainer").style.setProperty("--yPosition", userBombY + "px");

this.users[newUserBomb].bomba = true;
document.getElementById("bombContainer").classList.add("moveBomb");
setTimeout(() => {
document.getElementById("bombContainer").classList.remove("moveBomb");
}, 2000);
}
},
findUsersWithBomb() {
return this.users.findIndex(user => user.bomba === true);
//return this.users.filter(user => user.bomba === true);
},

explosionBomb() {
if ()
;
},
},
mounted() {
console.log(this.users);
return this.users.findIndex(user => user.bomba === true);
//return this.users.filter(user => user.bomba === true);
}
});
