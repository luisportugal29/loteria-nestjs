import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Carta } from "./carta.entity";

@Entity()
export class Tablero {


    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Carta, carta => carta.tableros)
    @JoinTable()
    cartas: Carta[];

}