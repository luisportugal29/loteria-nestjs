import { Injectable } from "@nestjs/common/decorators"
import { InjectRepository } from "@nestjs/typeorm";
import { Carta } from "./entities/carta.entity";
import { Repository } from "typeorm";


@Injectable()
export class CartaService {

    constructor(@InjectRepository(Carta) private repo: Repository<Carta>) { }


    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }
}