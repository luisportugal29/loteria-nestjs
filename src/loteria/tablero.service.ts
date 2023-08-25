import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tablero } from "./entities/tablero.entity";
import { Repository } from "typeorm";
import { CartaService } from "./carta.service";
import { Carta } from "./entities/carta.entity";

@Injectable()
export class TableroService {

    constructor(
        @InjectRepository(Tablero) private repo: Repository<Tablero>,
        private cartaService: CartaService
    ) { }

    async generateRandomDecks(numberOfDecks: number) {
        const randomNumbers : number[][] = [];

        for(let i = 0; i < numberOfDecks; i++) {
            let existDeck = false;
            let randomDeck: number[] = [];
            do {

                randomDeck = this.generateDeck();
                
                existDeck = randomNumbers.some(numbers => this.areDecksEqual(numbers, randomDeck));
            
                break;

            } while( existDeck );
            
            randomNumbers.push(randomDeck);
        }
      

        const tableros: Tablero[] = [];

        for (const deck of randomNumbers) {
            const tablero = await this.addCardsToDeck(deck);
            tableros.push(tablero);
        }

        return tableros;
           
    }

    generateDeck() : number[] {
        let randomNumbers = [];

        for(let i = 0; i < 16; i++) {
            let randomNumber = 0;
            do {
                randomNumber = Math.ceil(Math.random() * (54 - 1) + 1);
            } while(randomNumbers.includes(randomNumber));
            randomNumbers.push(randomNumber);
        }

        return randomNumbers;
    }

    areDecksEqual(deck1: number[], deck2: number[]): boolean {
        const set1 = new Set(deck1);
        const set2 = new Set(deck2);

        for(const card of set1) {
            if ( !set2.has(card))
                return false;
        }
        return true;
    } 

    async addCardsToDeck(randomDeck: number[]) {

        const tablero = this.repo.create();
        const cartas: Carta[] = [];
    
        for (let card of randomDeck) {
            const carta = await this.cartaService.findOne(card);
            cartas.push(carta);
        }

        tablero.cartas = cartas;

        return this.repo.save(tablero);
    }
}