class Animacao {
    constructor(contexto){
        this.sprites = [];
        this.processamentosExtra = [];
        this.ligado = false;
        this.contexto = contexto;
        this.msg = 'Inciar';
        this.tamanhoFont = 30;
        this.gameOver = false;
    }

    get nome() {
        return Animacao.name;
    }

    novoSprite(sprite) {
        this.sprites.push(sprite);
        sprite.animacao = this;
    }

    excluirSprite(sprite) {
        const pos = this.sprites.indexOf(sprite);
        this.sprites[pos].excluir = true;
    }

    novoProcessamento(processo) {
        this.processamentosExtra.push(processo);
    }

    ligar(){
        this.ligado = true;
        this.msg = null;

        sons['musica-acao'].loop = true;
        sons['musica-acao'].volume = 0.7;
        sons['musica-acao'].play();

        if (this.gameOver) {
            for (let spt of this.sprites) {
                if (spt.nome == Nave.name) spt.vidas = TOTAL_VIDAS;
                if (spt.nome == Niveis.name) spt.reiniciar();
            }
            this.gameOver = false;
        }

        this.proximoFrame();
    }

    desligar() {
        this.ligado = false; 
        sons['musica-acao'].pause();
    }

    escreverMsg() {
        this.desenharRetangulo(0,0,400,100,'black', 0.5, true);
        this.escrever(this.msg, 150, 265);
    }

    desenharRetangulo(x, y, largura, altura, cor = 'black', alfa = 1, central = false) {
        if (central) {
            x = this.contexto.canvas.width/2 - largura/2;
            y = this.contexto.canvas.height/2 - altura/2;
        }
        this.contexto.save();
        this.contexto.globalAlpha = alfa;
        this.contexto.fillStyle = cor;
        this.contexto.fillRect(x, y, largura, altura);
        this.contexto.restore();
    }
    
    escrever(texto, x, y, font = this.tamanhoFont+'px arial', cor = 'white', alfa = 1, centro = true) {
        this.contexto.save();
        this.contexto.globalAlpha = alfa;
        this.contexto.fillStyle = cor;
        this.contexto.font = font;

        if (centro) {
            this.contexto.textBaseLine = 'middle';
            this.contexto.textAlign = 'center';
            x = this.contexto.canvas.width/2;
        }

        this.contexto.fillText(texto, x, y);
        this.contexto.restore();
    }

    pausar(msg, tamanhoFont, agora = false){
        if (this.ligado || agora) {
            this.msg = msg;
            this.tamanhoFont = tamanhoFont;
            this.desligar();
            this.escreverMsg();
        } else {
            this.ligar();
        }
    }

    proximoFrame(){
        // Se não estiver ligado retorne
        if (!this.ligado) return;

        // Atualiza o estado dos sprites
        this.sprites.forEach(sprite => sprite.atualizar());

        this.processamentosExtra.forEach( processo => processo())
        
        // Excluir sprites que saíram da tela
        this.excluirSprites();

        // Desenha sprites
        // Lima a tela
        this.limparTela();

        this.sprites.forEach(sprite => sprite.desenhar());

        if (!this.ligado) this.escreverMsg();

        // Loop da animação
        var self = this;
        requestAnimationFrame(() => self.proximoFrame());

    }

    excluirSprites() {
        let novaLista = [];
        this.sprites.forEach(sprite => {
            if (!(sprite.excluir)) {
                novaLista.push(sprite);
            }
        });
        this.sprites = novaLista;
    }

    limparTela(){
        var ctx = this.contexto;
        ctx.beginPath();
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        ctx.fill();
    }

    
}