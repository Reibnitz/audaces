import { Rodada } from './../interfaces/interface-rodada';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jogo-da-velha',
    templateUrl: './jogo-da-velha.component.html',
    styleUrls: ['./jogo-da-velha.component.scss'],
})
export class JogoDaVelhaComponent implements OnInit {

    public jogadorAtual: string = '';
    public vencedor: null | string = null;
    public finalizado: boolean = false;
    private rodada: Rodada = {jogador1:null, jogador2:null};
    public jogo: Array<Array<string>> = [];
    public contador: number = 0;
    public tempo: number = 30;

    constructor() {}

    ngOnInit(): void {
        this.reiniciar();
    }

    public reiniciar(): void {
        this.jogo = [
            ['','',''],
            ['','',''],
            ['','','']
        ];
        this.rodada = {
            jogador1: true,
            jogador2: false
        };
        this.finalizado = false;
        this.contador = 0;
        this.tempo = 30;
        this.definirJogadorAtual();
    }

    public jogar(x: number, y: number) {
        if (this.verificarCelula(x,y) && !this.finalizado && this.tempo > 0) {
            this.jogo[x][y] = this.rodada.jogador1 ? 'X' : 'O';
            this.finalizado = this.verificarResultado();
            if (!this.finalizado) this.alterarJogador();
            this.contador ++;
            if (this.contador == 1) this.iniciarTimer()
        }
    }

    private verificarCelula(x: number,y: number): boolean {
        return this.jogo[x][y] === '';
    }

    private verificarResultado() {
        let resultado = [
            this.verificarLinhas(),
            this.verificarColunas(),
            this.verificarDiagonais()
        ]

        return resultado.some(x => x === true);
    }

    private verificarLinhas(): boolean {
        let linhas = [0, 1, 2];
        let resultados = [];

        for (let x of linhas) {
            resultados.push(this.jogo[x][0] !== ''
            && this.jogo[x][0] === this.jogo [x][1]
            && this.jogo[x][0] === this.jogo[x][2]);
        }

        return resultados.some(x => x === true);
    }

    private verificarColunas(): boolean {
        let colunas = [0, 1, 2];
        let resultados = [];

        for (let x of colunas) {
            resultados.push(this.jogo[0][x] !== ''
            && this.jogo[0][x] === this.jogo [1][x]
            && this.jogo[0][x] === this.jogo[2][x]);
        }

        return resultados.some(x => x === true);
    }

    private verificarDiagonais(): boolean {
        let resultados = [];

        resultados.push(this.jogo[0][0] !== ''
        && this.jogo[0][0] === this.jogo[1][1]
        && this.jogo[0][0] === this.jogo[2][2]);

        resultados.push(this.jogo[0][2] !== ''
        && this.jogo[0][2] === this.jogo[1][1]
        && this.jogo[0][2] === this.jogo[2][0]);

        return resultados.some(x => x === true);
    }

    private alterarJogador(): void {
        this.rodada.jogador1 = !this.rodada.jogador1;
        this.rodada.jogador2 = !this.rodada.jogador2;

        this.definirJogadorAtual();
    }

    private definirJogadorAtual() {
        this.jogadorAtual = this.rodada.jogador1 ? 'Jogador 1' : 'Jogador 2';
    }

    private iniciarTimer() {
        const self = this;
        const timer = setInterval(function(){
            if (self.contador > 0 && self.tempo > 1 && !self.finalizado && self.contador < 9) {
                self.tempo--;
            } else if (self.finalizado || self.contador == 9) {
                clearInterval(timer);
            } else {
                self.tempo--;
                clearInterval(timer);
            };
        } ,1000);
    }
}
