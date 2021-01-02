class Vidas {
    constructor(nave, x, y, tamanho, cor) {
        this.nave = nave;
        this.x = x;
        this.y = y;
        this.tamanho = tamanho;
        this.cor = cor;
    }

    atualizar() {

    }

    desenhar() {
        for (let vida = 0; vida < TOTAL_VIDAS; vida++) {
            let modo = 'fill';
            if (vida > this.nave.vidas - 1) {
                modo = 'stroke';
            }
            this.star(this.nave.contexto, this.x + (vida * this.tamanho * 2.2), this.y, this.tamanho, 'yellow', modo);
        }
    }

    star(ctx, x, y, r, cor, modo = 'fill')
    {
        let p = 5;
        let m = 0.4;
        ctx.save();
        ctx.fillStyle = cor;
        ctx.strokeStyle = cor;
        ctx.beginPath();
        ctx.translate(x, y);
        ctx.moveTo(0,0-r);
        for (var i = 0; i < p; i++)
        {
            ctx.rotate(Math.PI / p);
            ctx.lineTo(0, 0 - (r*m));
            ctx.rotate(Math.PI / p);
            ctx.lineTo(0, 0 - r);
        }
        if (modo == 'fill') {
            ctx.fill();
        } else {
            ctx.stroke();
        }
        
        ctx.restore();
    }
    
}