export class Entidade {
    #x;
    #y;
    #vx;
    #vy;
    #contexto;
    #tamanho;

    #tipo;
    #emoji;

    constructor(tipo, contexto, tamanhoFonte) {
        this.#tipo = tipo;
        this.setEmoji(tipo);
        this.#contexto = contexto;

        this.#tamanho = tamanhoFonte;
        this.#contexto.font = `${this.#tamanho}px Arial`;

        this.#x = 0;
        this.#y = 0;
        this.#vx = 2;
        this.#vy = 2;
    }

    setEmoji(tipo) {
        if (tipo === "pedra") {
            this.#emoji = "🗿";
        }
        else if (tipo === "papel") {
            this.#emoji = "📝";
        }
        else if (tipo === "tesoura") {
            this.#emoji = "✂️";
        }
    }

    Desenhar() {
        this.#contexto.font = `${this.#tamanho}px Arial`;
        this.#contexto.fillText(this.#emoji, this.#x, this.#y);
    }

    PosicaoInicial(x, y) {
        let novoX = Math.random() * (x.max - x.min) + x.min;
        let novoY = Math.random() * (y.max - y.min) + y.min;

        this.#x = novoX;
        this.#y = novoY;
    }

    Movimento(largura, altura) {
        if (this.#x+this.#tamanho/2 >= largura || this.#x - this.#tamanho/2 <= 0) {
            this.#vx = -this.#vx;
        }

        if (this.#y + this.#tamanho/2 >= altura || this.#y - this.#tamanho/2 <= 0) {
            this.#vy = -this.#vy;
        }

        this.#x += this.#vx;
        this.#y += this.#vy;
    }

    get tipo () {
        return this.#tipo;
    }
    set tipo (valor) {
        const valoresPossiveis = new Set(["pedra", "papel", "tesoura"]);
        if (!valoresPossiveis.has(valor)) {
            throw new Error("Tipo deve ser pedra, papel ou tesoura.");
        }
        this.#tipo = valor;
    }

    get emoji() {
        return this.#emoji;
    }
    get x() {
        return this.#x;
    }

    set x(valor) {
        if (typeof valor === 'number') {
            this.#x = valor;
        } else {
            throw new Error('O valor atribuído a x deve ser do tipo número.');
        }
    }

    get y() {
        return this.#y;
    }

    set y(valor) {
        if (typeof valor === 'number') {
            this.#y = valor;
        } else {
            throw new Error('O valor atribuído a y deve ser do tipo número.');
        }
    }

    get vx() {
        return this.#vx;
    }

    set vx(valor) {
        if (typeof valor === 'number') {
            this.#vx = valor;
        } else {
            throw new Error('Vx deve ser do tipo número.');
        }
    }

    get vy() {
        return this.#vy;
    }

    set vy(valor) {
        if (typeof valor === 'number') {
            this.#vy = valor;
        } else {
            throw new Error('Vy deve ser do tipo número.');
        }
    }

    get contexto() {
        return this.#contexto;
    }

    set contexto(valor) {
        if (valor instanceof CanvasRenderingContext2D) {
            this.#contexto = valor;
        } else {
            throw new Error('Contexto deve ser uma instância de CanvasRenderingContext2D.');
        }
    }

    get tamanho() {
        return this.#tamanho;
    }

    set tamanho(valor) {
        if (typeof valor === 'number') {
            this.#tamanho = valor;
        } else {
            throw new Error('Tamanho deve ser do tipo número.');
        }
    }

}