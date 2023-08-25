import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1692990023160 implements MigrationInterface {
    name = 'InitialSchema1692990023160'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tablero" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "carta" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "photoUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "tablero_cartas_carta" ("tableroId" integer NOT NULL, "cartaId" integer NOT NULL, PRIMARY KEY ("tableroId", "cartaId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8e3335186ece76c95d4a18868d" ON "tablero_cartas_carta" ("tableroId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2d654b44365308a13b25ff179" ON "tablero_cartas_carta" ("cartaId") `);
        await queryRunner.query(`DROP INDEX "IDX_8e3335186ece76c95d4a18868d"`);
        await queryRunner.query(`DROP INDEX "IDX_d2d654b44365308a13b25ff179"`);
        await queryRunner.query(`CREATE TABLE "temporary_tablero_cartas_carta" ("tableroId" integer NOT NULL, "cartaId" integer NOT NULL, CONSTRAINT "FK_8e3335186ece76c95d4a18868d1" FOREIGN KEY ("tableroId") REFERENCES "tablero" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d2d654b44365308a13b25ff1799" FOREIGN KEY ("cartaId") REFERENCES "carta" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("tableroId", "cartaId"))`);
        await queryRunner.query(`INSERT INTO "temporary_tablero_cartas_carta"("tableroId", "cartaId") SELECT "tableroId", "cartaId" FROM "tablero_cartas_carta"`);
        await queryRunner.query(`DROP TABLE "tablero_cartas_carta"`);
        await queryRunner.query(`ALTER TABLE "temporary_tablero_cartas_carta" RENAME TO "tablero_cartas_carta"`);
        await queryRunner.query(`CREATE INDEX "IDX_8e3335186ece76c95d4a18868d" ON "tablero_cartas_carta" ("tableroId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d2d654b44365308a13b25ff179" ON "tablero_cartas_carta" ("cartaId") `);

        const cartas = [
            { name: "El Gallo" },
            { name: "El Diablito" },
            { name: "La Dama" },
            { name: "El Catrín" },
            { name: "El Paraguas" },
            { name: "La Sirena" },
            { name: "La Escalera" },
            { name: "La Botella" },
            { name: "El Barril" },
            { name: "El Árbol" },
            { name: "El Melón" },
            { name: "El Valiente" },
            { name: "El Gorrito" },
            { name: "La Muerte" },
            { name: "La Pera" },
            { name: "La Bandera" },
            { name: "El Bandolón" },
            { name: "El Violoncello" },
            { name: "La Garza" },
            { name: "El Pájaro" },
            { name: "La Mano" },
            { name: "La Bota" },
            { name: "La Luna" },
            { name: "El Cotorro" },
            { name: "El Borracho" },
            { name: "El Negrito" },
            { name: "El Corazón" },
            { name: "La Sandía" },
            { name: "El Tambor" },
            { name: "El Camarón" },
            { name: "Las Jaras" },
            { name: "El Músico" },
            { name: "La Araña" },
            { name: "El Soldado" },
            { name: "La Estrella" },
            { name: "El Cazo" },
            { name: "El Mundo" },
            { name: "El Apache" },
            { name: "El Nopal" },
            { name: "El Alacrán" },
            { name: "La Rosa" },
            { name: "La Calavera" },
            { name: "La Campana" },
            { name: "El Cantarito" },
            { name: "El Venado" },
            { name: "El Sol" },
            { name: "La Corona" },
            { name: "La Chalupa" },
            { name: "El Pino" },
            { name: "El Pescado" },
            { name: "La Palma" },
            { name: "La Maceta" },
        ];
        
        for (const carta of cartas) {
            await queryRunner.query(`
                INSERT INTO "carta"("name","photoUrl")
                VALUES('${carta.name}','')
            `);
        }

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d2d654b44365308a13b25ff179"`);
        await queryRunner.query(`DROP INDEX "IDX_8e3335186ece76c95d4a18868d"`);
        await queryRunner.query(`ALTER TABLE "tablero_cartas_carta" RENAME TO "temporary_tablero_cartas_carta"`);
        await queryRunner.query(`CREATE TABLE "tablero_cartas_carta" ("tableroId" integer NOT NULL, "cartaId" integer NOT NULL, PRIMARY KEY ("tableroId", "cartaId"))`);
        await queryRunner.query(`INSERT INTO "tablero_cartas_carta"("tableroId", "cartaId") SELECT "tableroId", "cartaId" FROM "temporary_tablero_cartas_carta"`);
        await queryRunner.query(`DROP TABLE "temporary_tablero_cartas_carta"`);
        await queryRunner.query(`CREATE INDEX "IDX_d2d654b44365308a13b25ff179" ON "tablero_cartas_carta" ("cartaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8e3335186ece76c95d4a18868d" ON "tablero_cartas_carta" ("tableroId") `);
        await queryRunner.query(`DROP INDEX "IDX_d2d654b44365308a13b25ff179"`);
        await queryRunner.query(`DROP INDEX "IDX_8e3335186ece76c95d4a18868d"`);
        await queryRunner.query(`DROP TABLE "tablero_cartas_carta"`);
        await queryRunner.query(`DROP TABLE "carta"`);
        await queryRunner.query(`DROP TABLE "tablero"`);
    }

}
