const SETA_PARA_ESQUERDA = 37;
const SETA_PARA_CIMA     = 38;
const SETA_PARA_DIREITA  = 39;
const SETA_PARA_BAIXO    = 40;
const BARRA_DE_ESPACO    = 32;
const ENTER = 13;

const TECLA_A = 65;
const TECLA_S = 83;
const TECLA_D = 68;
const TECLA_W = 87;

class Teclado {
    constructor(elemento){

        this.pressionadas   = [];
        this.disparadas     = [];
        this.funcoesDiparo  = [];


        var teclado = this;

        elemento.addEventListener('keydown', function(e){
            teclado.pressionadas[e.keyCode] = true;
            if (teclado.funcoesDiparo[e.keyCode] && !teclado.disparadas[e.keyCode]) {
                teclado.disparadas[e.keyCode] = true;
                teclado.funcoesDiparo[e.keyCode]();
            }
        });

        elemento.addEventListener('keyup', function(e){
            teclado.pressionadas[e.keyCode] = false;
            teclado.disparadas[e.keyCode] = false;
        });

    }

    get nome() {
        return Teclado.name;
    }

    pressionada(tecla){
        return this.pressionadas[tecla];
    }

    disparou(tecla, callback) {
        this.funcoesDiparo[tecla] = callback;
    }
}