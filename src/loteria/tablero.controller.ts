import { Controller, Param, Post } from "@nestjs/common";
import { TableroService } from "./tablero.service";


@Controller('tablero')
export class TableroController {

    constructor(private tableroService: TableroService) {}

    @Post('/:numberOfDecks')
    generateRandomDecks(@Param('numberOfDecks') numberOfDecks: string) {
        
        return this.tableroService.generateRandomDecks(parseInt(numberOfDecks));

    }
}