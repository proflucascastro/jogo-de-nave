class Spritesheet {
    constructor(contexto, imagem, qtdeLinhas, qtdeColunas, repete = true, posicaoX, posicaoY) {
        this.contexto = contexto;
        this.imagem = imagem;
        this.qtdeLinhas = qtdeLinhas;
        this.qtdeColunas = qtdeColunas;
        this.linha = 0;
        this.coluna = 0;
        this.estado = 0;
        this.intervalo = 100;
        this.ultimoTempo = new Date().getTime();
        this.repete = repete;
        this.posicaoX = posicaoX;
        this.posicaoY = posicaoY;
        this.excluir = false;

        sons.explosao.currentTime = 0;
        sons.explosao.volume = 0.2;
        sons.explosao.play();
}

    proximoQuadro(){
        var agora = new Date().getTime();

        if (agora - this.ultimoTempo < this.intervalo) return;

        if (this.repete) {
            this.coluna = (this.coluna == this.qtdeColunas - 1)? 0 : this.coluna + 1;
        } else {
            this.coluna += 1;
        }
        
        this.ultimoTempo = agora;
    }

    get largura() {
        return  this.imagem.width / this.qtdeColunas;
    }

    get altura() {
        return this.imagem.height / this.qtdeLinhas;
    }

    get x(){
        return this.coluna * this.largura;
    }

    get y(){
        return this.linha * this.altura;
    }

    desenhar() {
        this.contexto.drawImage(
            this.imagem,
            this.x,
            this.y,
            this.largura,
            this.altura,
            this.posicaoX,
            this.posicaoY,
            this.largura,
            this.altura
        );
    }

    atualizar() {
        this.proximoQuadro();
        if (this.coluna == this.qtdeColunas) {
            this.animacao.excluirSprite(this);
        } 
    }

}