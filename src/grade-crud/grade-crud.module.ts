import { Module } from '@nestjs/common';
import { GradeCrudService } from './grade-crud.service';
import { GradeCrudController } from './grade-crud.controller';

@Module({
  controllers: [GradeCrudController],
  providers: [GradeCrudService],
})
export class GradeCrudModule {}
