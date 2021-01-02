class Fundo {
    constructor(contexto, imagem, velocidade) {
        this.contexto = contexto;
        this.imagem = imagem;
        this.velocidade = velocidade;
        this.posicaoEmenda = 0;
        this.excluir = false;
    }

    get nome() {
        return Fundo.name;
    }

    atualizar() {
        this.posicaoEmenda += this.velocidade;

        if (this.posicaoEmenda > this.imagem.height) this.posicaoEmenda = 0;
    }

    desenhar() {
        let posicaoY = this.posicaoEmenda - this.imagem.height;
        this.contexto.drawImage(this.imagem, 0, posicaoY, this.imagem.width, this.imagem.height);
        
        posicaoY = this.posicaoEmenda;
        this.contexto.drawImage(this.imagem, 0, posicaoY, this.imagem.width, this.imagem.height);
    }
}