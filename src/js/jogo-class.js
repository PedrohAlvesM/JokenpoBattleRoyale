import { Entidade } from "./entidade-class.js";

export class Jogo {
    #gameOver;

    #tamanhoEmoji;
    #tempoPerdido;
    #IDContador;

    #nPedra;
    #nPapel;
    #nTesoura;
    #entidades;
    #NUMERO_POR_ENTIDADES;

    #jogo;
    #ctx;
    
    Start() {
        this.#gameOver = false;
        this.#jogo = document.getElementById("jogo");
        this.#ctx = this.#jogo.getContext("2d");
        this.#jogo.width = window.innerWidth / 2;
        this.#jogo.height = window.innerHeight / 2;

        
        this.#tempoPerdido = 0;
        this.#IDContador = setInterval(() => { this.#tempoPerdido++ }, 1000);
        
        this.#entidades = [];
        this.#tamanhoEmoji = Number(document.getElementById("tamanho-entidade").value) ?? 24;
        this.#NUMERO_POR_ENTIDADES = Number(document.getElementById("n-entidade").value )?? 10;
        this.#nPedra = this.#NUMERO_POR_ENTIDADES;
        this.#nPapel = this.#NUMERO_POR_ENTIDADES;
        this.#nTesoura = this.#NUMERO_POR_ENTIDADES;

        document.getElementById("numero-pedra").innerText = `Pedra: ${this.#NUMERO_POR_ENTIDADES}`;
        document.getElementById("numero-papel").innerText = `Papel: ${this.#NUMERO_POR_ENTIDADES}`;
        document.getElementById("numero-tesoura").innerText = `Tesoura: ${this.#NUMERO_POR_ENTIDADES}`;

        for (let i = 0; i < this.#NUMERO_POR_ENTIDADES; i++) {
            const e = new Entidade("pedra", this.#ctx, this.#tamanhoEmoji);
            e.PosicaoInicial({ min: this.#tamanhoEmoji, max: this.#jogo.width - this.#tamanhoEmoji }, { min: this.#tamanhoEmoji, max: this.#jogo.height - this.#tamanhoEmoji });
            this.#entidades.push(e);
        }
        for (let i = 0; i < this.#NUMERO_POR_ENTIDADES; i++) {
            const e = new Entidade("papel", this.#ctx, this.#tamanhoEmoji);
            e.PosicaoInicial({ min: this.#tamanhoEmoji, max: this.#jogo.width - this.#tamanhoEmoji }, { min: this.#tamanhoEmoji, max: this.#jogo.height - this.#tamanhoEmoji });
            this.#entidades.push(e);
        }
        for (let i = 0; i < this.#NUMERO_POR_ENTIDADES; i++) {
            const e = new Entidade("tesoura", this.#ctx, this.#tamanhoEmoji);
            e.PosicaoInicial({ min: this.#tamanhoEmoji, max: this.#jogo.width - this.#tamanhoEmoji }, { min: this.#tamanhoEmoji, max: this.#jogo.height - this.#tamanhoEmoji });
            this.#entidades.push(e);
        }
        this.#entidades.forEach(e => e.Desenhar());
    }


    Loop() {
        this.#ctx.clearRect(0, 0, this.#jogo.width, this.#jogo.height);

        this.#entidades.forEach(e => e.Desenhar());
        this.#entidades.forEach(e => e.Movimento(this.#jogo.width, this.#jogo.height));

        document.getElementById("numero-pedra").innerText = "Pedras: " + this.#nPedra;
        document.getElementById("numero-papel").innerText = "Papel: " + this.#nPapel;
        document.getElementById("numero-tesoura").innerText = "Tesouras: " + this.#nTesoura;
        document.getElementById("tempo-perdido").innerText = "Tempo perdido assistindo isso: " + this.#tempoPerdido + " segundos";

        if (this.#nPapel >= this.#NUMERO_POR_ENTIDADES * 3 || this.#nPedra >= this.#NUMERO_POR_ENTIDADES * 3 || this.#nTesoura >= this.#NUMERO_POR_ENTIDADES * 3) {
            clearInterval(this.#IDContador);
            this.#gameOver = true;

        }
        else {
            this.Colisao();
            window.requestAnimationFrame(this.Loop.bind(this));
        }
    }

    Colisao() {
        for (let i = 0; i < this.#entidades.length; i++) {
            for (let j = 0; j < this.#entidades.length; j++) {

                if (this.#entidades[i].tipo === this.#entidades[j].tipo) {
                    continue
                }

                if (this.#entidades[i].x >= this.#entidades[j].x && this.#entidades[i].x <= this.#entidades[j].x + this.#entidades[j].tamanho &&
                    this.#entidades[i].y >= this.#entidades[j].y && this.#entidades[i].y <= this.#entidades[j].y + this.#entidades[j].tamanho) {

                    if (this.#entidades[i].tipo === "pedra" && this.#entidades[j].tipo === "tesoura") {
                        this.#entidades[j].tipo = "pedra";
                        this.#entidades[j].setEmoji("pedra");

                        this.#nPedra++;
                        this.#nTesoura--;
                    }
                    else if (this.#entidades[i].tipo === "tesoura" && this.#entidades[j].tipo === "papel") {
                        this.#entidades[j].tipo = "tesoura";
                        this.#entidades[j].setEmoji("tesoura");

                        this.#nTesoura++;
                        this.#nPapel--;
                    }
                    else if (this.#entidades[i].tipo === "papel" && this.#entidades[j].tipo === "pedra") {
                        this.#entidades[j].tipo = "papel";
                        this.#entidades[j].setEmoji("papel");

                        this.#nPapel++;
                        this.#nPedra--;
                    }

                    this.#entidades[i].vx = -this.#entidades[i].vx;
                    this.#entidades[j].vx = -this.#entidades[j].vx;
                    this.#entidades[i].vy = -this.#entidades[i].vy;
                    this.#entidades[j].vy = -this.#entidades[j].vy;
                }

            }
        }
    }

    Recomecar() {
        this.#ctx.clearRect(0, 0, this.#jogo.width, this.#jogo.height);
        this.#entidades = [];
        this.#gameOver = false;
        clearInterval(this.#IDContador);
        this.Start();
    }

    get gameOver() {
        return this.#gameOver;
    }

    set gameOver(valor) {
        if (typeof valor != "boolean") {
            throw new Error("GameOver deve ser do tipo boolean");
        }
        this.#gameOver = valor;
    }
    
    get tamanhoEmoji() {
        return this.#tamanhoEmoji;
    }
    
    set tamanhoEmoji(valor) {
        if (typeof valor != "number") {
            throw new Error("TamanhoEmoji deve ser do tipo number");
        }
        this.#tamanhoEmoji = valor;
    }
    
    get tempoPerdido() {
        return this.#tempoPerdido;
    }
    
    set tempoPerdido(valor) {
        if (typeof valor != "number") {
            throw new Error("TempoPerdido deve ser do tipo number");
        }
        this.#tempoPerdido = valor;
    }
    
    get IDContador() {
        return this.#IDContador;
    }

    set IDContador(valor) {
        if (typeof valor != "number") {
            throw new Error("IDContador deve ser do tipo number");
        }
        this.#IDContador = valor;
    }
    
    get nPedra() {
        return this.#nPedra;
    }
    
    set nPedra(valor) {
        if (typeof valor != "") {
            throw new Error("nPedra deve ser do tipo number.");
        }
        this.#nPedra = valor;
    }
    
    get nPapel() {
        return this.#nPapel;
    }
    
    set nPapel(valor) {
        if (typeof valor != "number") {
            throw new Error("nPapel deve ser do tipo number.");
        }
        this.#nPapel = valor;
    }
    
    get nTesoura() {
        return this.#nTesoura;
    }
    
    set nTesoura(valor) {
        if (typeof valor != "number") {
            throw new Error("nTesoura deve ser do tipo number");
        }
        this.#nTesoura = valor;
    }
    
    get entidades() {
        return this.#entidades;
    }

    set entidades(valor) {
        if (valor instanceof Entidade) {
            throw new Error("Entidades guarda instâncias da classe Entidade.");
        }
        this.#entidades = valor;
    }

    get NUMERO_POR_ENTIDADES() {
        return this.#NUMERO_POR_ENTIDADES;
    }
}