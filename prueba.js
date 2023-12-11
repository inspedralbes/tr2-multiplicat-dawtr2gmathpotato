// Version: 1.0
const tempsTotal=40;

function mostrarTemps(){
    
}
function tempsAcabat(){
    console.log("Temps acabat");
}
function tempsIniciat(){
    console.log(`Temps iniciat: ${tempsTotal} segons`);
    setTimeout(tempsAcabat, tempsTotal*1000);
}
tempsIniciat();