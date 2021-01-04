class TiroOvni {
    constructor(contexto, x, y, raio, cor, velocidadeX, velocidadeY, som = true) {
        this.contexto = contexto;
        this.x = x;
        this.y = y;
        this.raio = raio;
        this.cor = cor;
        this.velocidadeX = velocidadeX;
        this.velocidadeY = velocidadeY;
        this.excluir = false;
        if (som) {
            sons.tiro.volume = 0.2;
            sons.tiro.play();
        }

    }

    colidiu() {
        this.remover();
    }

    get nome() {
        return TiroOvni.name;
    }

    desenhar(){
        var ctx = this.contexto;
        ctx.save();

        ctx.fillStyle = this.cor;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    atualizar(){
        var ctx = this.contexto;

        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    }

    get estaFora(){
        return (this.x < 0 || this.x > this.contexto.canvas.width || this.y < 0 || this.y > this.contexto.canvas.height);
    }

    remover() {
        this.excluir = true;
    }

    get retangulosColisao(){
        return [{
            x1: this.x - this.raio,
            x2: this.raio * 2 + this.x,
            y1: this.y - this.raio,
            y2: this.raio * 2 + this.y
        }];
    }

}