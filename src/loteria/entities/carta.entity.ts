import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Tablero } from "./tablero.entity";

@Entity()
export class Carta {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    photoUrl: string;

    @ManyToMany(() => Tablero, tablero => tablero.cartas )
    tableros: Tablero[];

}