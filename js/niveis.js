class Niveis {
    constructor(contexto, nave) {
        this.contexto = contexto;
        this.nave = nave;
        this.reiniciar();
    }

    get nome() {
        return Niveis.name;
    }

    atualizar() {

    }

    reiniciar() {
        this.nivel = 1;
        this.velocidade = 1;
        this.qtdeOvnis = 10;
        this.ovnis = 0;
        this.pontos = 0;
    }

    desenhar() {
        this.contexto.save();
        this.contexto.textAlign = 'right';
        this.contexto.font = '  20px Arial';
        this.contexto.fillStyle = 'white';
        this.contexto.fillText(`Nível: ${this.nivel} `, this.contexto.canvas.width, 25);
        this.contexto.fillText(`Pontos: ${this.pontos} `, this.contexto.canvas.width, 50);

        this.contexto.font = '  10px Arial';
        this.contexto.fillText(`Desenvolvido por Lucas Castro - estudo do livro "Desenvolva jogos com HTML5 Canvas e JavaScprit `, this.contexto.canvas.width, this.contexto.canvas.height-5);;
        this.contexto.restore();
    }

    diminuiOvni(){
        this.pontos += 10;
        this.ovnis++;
        if (this.ovnis == this.qtdeOvnis) {
            this.nivel++;
            this.ovnis = 0;
            VELOCIDADE = this.nivel;
            this.nave.velocidade *= (1 + VELOCIDADE/5);
        } 

    }
}