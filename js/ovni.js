class Ovni {
    constructor(contexto, imagem) {
        this.contexto = contexto;
        this.imagem = imagem;
        this.excluir = false;
        this.x = this.aleatorioEntre(0, contexto.canvas.width - imagem.width);
        this.y = -imagem.height;
        this.velocidade = this.aleatorioEntreDecimal(0.7 * (1 + VELOCIDADE/5), 1.0 * (1 + VELOCIDADE/5));
        this.ultimoTempo = new Date().getTime();
        this.intervalo = 3000 / VELOCIDADE;
    }

    get nome() {
        return Ovni.name;
    }

    colidiu() {
        this.remover();
        const bomba = new Spritesheet(this.contexto, imagens['explosao'], 1, 5, false, this.x, this.y);
        this.animacao.novoSprite(bomba);

    }

    aleatorioEntre(min, max) {
        return Math.floor(min + Math.random() * (max -  min + 1));
    }

    aleatorioEntreDecimal(min, max) {
        return min + Math.random() * (max -  min);
    }

    atualizar() {
        this.y += this.velocidade;
    }

    desenhar() {
        this.contexto.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    }

    get estaFora(){
        return (this.x < -this.imagem.width || this.x > this.contexto.canvas.width || this.y < -this.imagem.height || this.y > this.contexto.canvas.height);
    }

    remover(){
        this.excluir = true;
    }

    novoOvni(animacao, colisor) {
        const agora = new Date().getTime();
        if (agora - this.ultimoTempo > this.intervalo) {
            const o = new Ovni(this.contexto, this.imagem);
            animacao.novoSprite(o);
            colisor.atualizaListaColisoes();
            this.ultimoTempo = agora;
        }
    }

    get retangulosColisao(){
        return [{
            x1: this.x,
            x2: this.x + this.imagem.width,
            y1: this.y,
            y2: this.y + this.imagem.height
        }];
    }


}