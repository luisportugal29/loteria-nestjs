import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carta } from './entities/carta.entity';
import { Tablero } from './entities/tablero.entity';
import { TableroController } from './tablero.controller';
import { TableroService } from './tablero.service';
import { CartaService } from './carta.service';


@Module({
  imports: [TypeOrmModule.forFeature([Carta, Tablero])],
  controllers: [TableroController],
  providers: [TableroService, CartaService],
})
export class LoteriaModule {}