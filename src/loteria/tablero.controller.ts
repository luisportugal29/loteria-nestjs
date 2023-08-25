import { Controller, Param, Post } from "@nestjs/common";
import { TableroService } from "./tablero.service";


@Controller('tablero')
export class TableroController {

    constructor(private tableroService: TableroService) {}

    @Post('/:numberOfDecks')
    async generateRandomDecks(@Param('numberOfDecks') numberOfDecks: string) {
        
        const tableros = await  this.tableroService.generateRandomDecks(parseInt(numberOfDecks));

        return tableros;
    }
}