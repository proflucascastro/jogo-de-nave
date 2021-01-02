class Nave {
    constructor(contexto, teclado, imagem, velocidade) {
        this.contexto = contexto;
        this.teclado = teclado;
        this.imagem = imagem;
        this.velocidade = velocidade;
        this.excluir = false;
        this.vidas = TOTAL_VIDAS;

        this.posicionar();
    }

    get nome() {
        return Nave.name;
    }

    posicionar() {
        this.x = this.contexto.canvas.width / 2 - this.imagem.width / 2;
        this.y = this.contexto.canvas.height - this.imagem.height - 15;
    }

    colidiu() {
        this.vidas--;
        if (this.vidas == 0) {
            this.animacao.gameOver = true;
            this.animacao.pausar('Game Over', 40, true);
        } else {
            this.animacao.pausar('Enter para continuar', 30, true);
        }
        for (let spt of this.animacao.sprites) {
            spt.excluir = (spt.nome == Ovni.name);
        }
        this.posicionar();
    }

    atualizar() {

        if ((this.teclado.pressionada(SETA_PARA_ESQUERDA) || this.teclado.pressionada(TECLA_A)) && this.x > 0)
            this.x -= this.velocidade;

        if ((this.teclado.pressionada(SETA_PARA_DIREITA) || this.teclado.pressionada(TECLA_D)) && this.x < this.contexto.canvas.width - this.imagem.width)
            this.x += this.velocidade;

        if ((this.teclado.pressionada(SETA_PARA_CIMA) || this.teclado.pressionada(TECLA_W)) && this.y > 0)
            this.y -= this.velocidade;

        if ((this.teclado.pressionada(SETA_PARA_BAIXO) || this.teclado.pressionada(TECLA_S)) && this.y < this.contexto.canvas.height - this.imagem.height)
            this.y += this.velocidade;
    }

    desenhar() {
        this.contexto.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    }

    get xCentro() {
        return this.x + this.imagem.width / 2
    }

    atirar(colisor) {
        const t = new Tiro(this.contexto, this.xCentro, this.y + 5, 5, 'yellow', 0, -10);
        this.animacao.novoSprite(t);
        colisor.atualizaListaColisoes();;
    }

    get retangulosColisao() {
        return [{
            x1: this.x,
            x2: this.x + this.imagem.width,
            y1: this.y,
            y2: this.y + this.imagem.height
        }];
    }

    remover() {
        this.excluir = true;
    }

}