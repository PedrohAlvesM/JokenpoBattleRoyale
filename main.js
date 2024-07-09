import { Jogo } from "./src/js/jogo-class.js";

const jogo = new Jogo();
jogo.Start();

let jogoComecou = false;
document.getElementById("comecar").addEventListener("click", ()=> {
    if (jogo.gameOver || jogoComecou) {
        jogo.Recomecar();
    }
    else {
        jogoComecou = true
        jogo.Recomecar();
        document.getElementById("comecar").textContent = "Recomeçar";
    }
});