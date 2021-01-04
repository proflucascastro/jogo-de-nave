class Ovni {
    constructor(contexto, colisor, imagem) {
        this.contexto = contexto;
        this.colisor = colisor;
        this.imagem = imagem;
        this.excluir = false;
        this.x = this.aleatorioEntre(0, contexto.canvas.width - this.imagem.width);
        this.y = -imagem.height;
        this.velocidade = this.aleatorioEntreDecimal(0.7 * (1 + VELOCIDADE/5), 1.0 * (1 + VELOCIDADE/5));
        this.ultimoTempo = new Date().getTime();
        this.ultimoTempoX = new Date().getTime();
        this.ultimoTempoTiro = new Date().getTime();
        this.intervalo = 3000 / VELOCIDADE;
        this.intervaloX = 2000 / VELOCIDADE;
        this.intervaloTiro = 3000 / VELOCIDADE;
        this.velocidadeX = Math.sign(this.aleatorioEntre(-1000,1000));
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
        const agora = new Date().getTime();
        if (agora - this.ultimoTempoTiro > this.intervaloTiro) {
            this.atirar();
            this.ultimoTempoTiro = agora;
        }
        this.y += this.velocidade;

        this.x += this.velocidadeX;
        
        if (agora - this.ultimoTempoX > this.intervaloX) {
            this.velocidadeX = Math.sign(this.aleatorioEntre(-100,100));
            this.ultimoTempoX = agora;
        }

        if (this.x <= 0 || this.x + this.imagem.width >=  this.contexto.canvas.width) {
            console.log(this.x);
            this.velocidadeX *= -1;
        } 

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
            const o = new Ovni(this.contexto, colisor, imagens['ovni']);
            animacao.novoSprite(o);
            this.colisor.atualizaListaColisoes();
            this.ultimoTempo = agora;
        }
    }

    get xCentro() {
        return this.x + this.imagem.width / 2
    }

    atirar(){
        const t = new TiroOvni(this.contexto, this.xCentro, this.y + this.imagem.height, 5, 'red', 0, 3, false);
        this.animacao.novoSprite(t);
        this.colisor.atualizaListaColisoes();

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