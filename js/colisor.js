class Colisor {
    constructor(animacao) {
        this.pares = [];
        this.animacao = animacao;
        this.listaColisoes = [];
    }

    get nome() {
        return Colisor.name;
    }

    novoPar(tipo1, tipo2, acao) {
        this.pares.push(
            {
                tipo1: tipo1, 
                tipo2: tipo2, 
                acao: acao
            }
        );
        this.atualizaListaColisoes();
    }

    atualizaListaColisoes() {
        let novaLista = [];
        for (const par of this.pares) {
            const listaTipo1 = this.animacao.sprites.filter( (s) => {
                return s.nome == par.tipo1 && !s.excluir
            });
            const listaTipo2 = this.animacao.sprites.filter( (s) => {
                return s.nome == par.tipo2 && !s.excluir
            });
            for (const spt1 of listaTipo1) {
                for (const spt2 of listaTipo2) {
                    novaLista.push({
                        sprite1: spt1,
                        sprite2: spt2,
                        acao: par.acao,
                    });
                }
            }
        }
        this.listaColisoes = novaLista;
    }

    processar() {
        for (const par of this.listaColisoes) {
            this.testaColisao(par);
        }
        this.atualizaListaColisoes();
    }

    testaColisao(par){
        var retangulos1 = par.sprite1.retangulosColisao;
        var retangulos2 = par.sprite2.retangulosColisao;

        colisoes:
        for(var retangulo1 of retangulos1) {
            for(var retangulo2 of retangulos2) {
                if (this.retangulosColidem(retangulo1, retangulo2)) {
                    if (par.acao) {
                        par.acao(par);
                    }
                    break colisoes;
                }
            }
        }
    }

    retangulosColidem(retangulo1, retangulo2) {
        return (retangulo1.x1 < retangulo2.x2) &&
            (retangulo1.x2 > retangulo2.x1) &&
            (retangulo1.y1 < retangulo2.y2) &&
            (retangulo1.y2 > retangulo2.y1) 
    }

}